-- RehabOS Supabase schema
-- Run in Supabase SQL editor. Auth users come from auth.users (Supabase Auth).

-- ============ Tables ============

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  primary_sport text,
  created_at timestamptz not null default now()
);

create table if not exists injury_intakes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  sport text not null,
  body_area text not null,
  mechanism text,
  pain_score int not null check (pain_score between 0 and 10),
  swelling text not null check (swelling in ('none','mild','moderate','severe')),
  bruising boolean not null default false,
  can_bear_weight boolean not null default true,
  can_move_joint boolean not null default true,
  numbness_tingling boolean not null default false,
  weakness boolean not null default false,
  instability boolean not null default false,
  visible_deformity boolean not null default false,
  suspected_fracture boolean not null default false,
  head_injury_symptoms boolean not null default false,
  chest_pain boolean not null default false,
  breathing_difficulty boolean not null default false,
  fever_or_infection boolean not null default false,
  worsening_symptoms boolean not null default false,
  calf_swelling_or_sob boolean not null default false,
  date_of_injury date,
  previous_injuries text,
  training_goal text,
  equipment text[],
  time_per_day int,
  preferred_difficulty text,
  created_at timestamptz not null default now()
);

create table if not exists red_flag_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  intake_id uuid references injury_intakes(id) on delete cascade,
  blocked boolean not null,
  flags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists sport_templates (
  id text primary key,
  sport text not null,
  common_areas text[] not null default '{}',
  demands text[] not null default '{}',
  concussion_warning boolean not null default false
);

create table if not exists rehab_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  intake_id uuid references injury_intakes(id) on delete set null,
  pathway_id text not null,
  pathway_name text not null,
  is_approximate_match boolean not null default false,
  match_note text,
  current_phase int not null default 1 check (current_phase between 1 and 5),
  sport text not null,
  body_area text not null,
  frequency text,
  created_at timestamptz not null default now()
);

create table if not exists rehab_phases (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references rehab_plans(id) on delete cascade,
  phase_number int not null check (phase_number between 1 and 5),
  name text not null,
  goal text,
  do_not_do text[],
  frequency text,
  pain_rule text,
  progression_criteria text[],
  regression_criteria text[],
  when_to_seek_help text
);

create table if not exists exercises (
  id text primary key,
  name text not null,
  body_area text not null,
  purpose text,
  difficulty int check (difficulty between 1 and 3),
  equipment text[],
  instructions text[],
  common_mistakes text[],
  safety_notes text,
  progression text,
  regression text,
  video_url text,
  image_url text,
  sports text[]
);

create table if not exists plan_exercises (
  id uuid primary key default gen_random_uuid(),
  phase_id uuid not null references rehab_phases(id) on delete cascade,
  exercise_id text not null references exercises(id),
  sets text,
  reps text,
  tempo text,
  rest text
);

create table if not exists daily_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid references rehab_plans(id) on delete set null,
  pain int not null check (pain between 0 and 10),
  range_of_motion int not null check (range_of_motion between 0 and 10),
  confidence int not null check (confidence between 0 and 10),
  activity_level int not null check (activity_level between 0 and 10),
  next_day_flare_up boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists progress_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid references rehab_plans(id) on delete set null,
  event text not null, -- e.g. 'phase_progressed', 'phase_regressed', 'paused'
  detail text,
  created_at timestamptz not null default now()
);

create table if not exists mental_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  confidence_score int check (confidence_score between 0 and 10),
  prompt text,
  journal_entry text,
  created_at timestamptz not null default now()
);

create table if not exists supplement_articles (
  id text primary key,
  title text not null,
  category text not null,
  summary text,
  key_points text[],
  cautions text[],
  regulatory_status text
);

create table if not exists safety_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null, -- e.g. 'red_flag_block', 'high_pain_checkin', 'referral_prompt_shown'
  detail text,
  created_at timestamptz not null default now()
);

-- ============ Row Level Security ============

alter table profiles enable row level security;
alter table injury_intakes enable row level security;
alter table red_flag_results enable row level security;
alter table rehab_plans enable row level security;
alter table rehab_phases enable row level security;
alter table plan_exercises enable row level security;
alter table daily_checkins enable row level security;
alter table progress_logs enable row level security;
alter table mental_logs enable row level security;
alter table safety_events enable row level security;
alter table exercises enable row level security;
alter table supplement_articles enable row level security;
alter table sport_templates enable row level security;

-- Own-data policies (read + write own rows only)
create policy "own profile" on profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "own intakes" on injury_intakes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own red flags" on red_flag_results for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own plans" on rehab_plans for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own checkins" on daily_checkins for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own progress" on progress_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own mental logs" on mental_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own safety events" on safety_events for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Phases/plan_exercises belong to a plan; access via owning plan
create policy "own phases" on rehab_phases for all
  using (exists (select 1 from rehab_plans p where p.id = plan_id and p.user_id = auth.uid()))
  with check (exists (select 1 from rehab_plans p where p.id = plan_id and p.user_id = auth.uid()));
create policy "own plan exercises" on plan_exercises for all
  using (exists (select 1 from rehab_phases ph join rehab_plans p on p.id = ph.plan_id where ph.id = phase_id and p.user_id = auth.uid()))
  with check (exists (select 1 from rehab_phases ph join rehab_plans p on p.id = ph.plan_id where ph.id = phase_id and p.user_id = auth.uid()));

-- Public read-only reference content
create policy "public read exercises" on exercises for select using (true);
create policy "public read supplements" on supplement_articles for select using (true);
create policy "public read sport templates" on sport_templates for select using (true);
