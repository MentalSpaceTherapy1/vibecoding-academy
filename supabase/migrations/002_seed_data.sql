-- VibeCoding Academy Seed Data
-- Course content: Phases, Lessons, and Badges

-- ============================================
-- PHASES (10 Phases)
-- ============================================
INSERT INTO public.phases (phase_number, title, description, icon, color, total_chapters, total_xp, order_index) VALUES
(1, 'Getting Started', 'Introduction to vibe coding and AI tools setup', '🚀', 'purple', 5, 400, 1),
(2, 'AI Tool Mastery', 'Master Claude Code, Lovable, Bolt, and other AI coding tools', '🤖', 'blue', 6, 600, 2),
(3, 'Web Fundamentals', 'HTML, CSS, and JavaScript basics through AI', '🌐', 'cyan', 5, 500, 3),
(4, 'React & Next.js', 'Build modern web apps with React and Next.js', '⚛️', 'indigo', 6, 700, 4),
(5, 'Backend Basics', 'Databases, APIs, and server-side development', '🗄️', 'green', 5, 600, 5),
(6, 'Full-Stack Project', 'Build your first complete web application', '📦', 'amber', 4, 2000, 6),
(7, 'Mobile Development', 'React Native and Expo for cross-platform apps', '📱', 'pink', 5, 600, 7),
(8, 'Advanced Patterns', 'Authentication, state management, and optimization', '🔧', 'orange', 5, 700, 8),
(9, 'Deployment & DevOps', 'Deploy and maintain production applications', '🚀', 'teal', 4, 500, 9),
(10, 'Capstone & Certification', 'Final projects and certification exam', '🎓', 'yellow', 4, 3000, 10);

-- ============================================
-- LESSONS (49 Total Chapters)
-- ============================================

-- Phase 1: Getting Started (5 chapters)
INSERT INTO public.lessons (phase_id, chapter_number, title, description, content_type, duration_minutes, xp_reward, order_index) VALUES
((SELECT id FROM phases WHERE phase_number = 1), 1, 'Welcome to VibeCoding', 'Introduction to the course and what you will learn', 'text', 10, 50, 1),
((SELECT id FROM phases WHERE phase_number = 1), 2, 'What is Vibe Coding?', 'Understanding the AI-first approach to development', 'text', 15, 75, 2),
((SELECT id FROM phases WHERE phase_number = 1), 3, 'Setting Up Your Environment', 'Installing and configuring essential tools', 'text', 20, 100, 3),
((SELECT id FROM phases WHERE phase_number = 1), 4, 'Your First AI-Generated Code', 'Creating your first program using AI', 'interactive', 25, 100, 4),
((SELECT id FROM phases WHERE phase_number = 1), 5, 'Understanding AI Prompts', 'How to communicate effectively with AI tools', 'text', 15, 75, 5);

-- Phase 2: AI Tool Mastery (6 chapters)
INSERT INTO public.lessons (phase_id, chapter_number, title, description, content_type, duration_minutes, xp_reward, order_index) VALUES
((SELECT id FROM phases WHERE phase_number = 2), 1, 'Introduction to Claude Code', 'Getting started with Anthropic Claude for coding', 'text', 20, 100, 6),
((SELECT id FROM phases WHERE phase_number = 2), 2, 'Mastering Claude Code', 'Advanced techniques and best practices', 'interactive', 30, 150, 7),
((SELECT id FROM phases WHERE phase_number = 2), 3, 'Lovable: AI Web App Builder', 'Building apps with natural language using Lovable', 'text', 25, 100, 8),
((SELECT id FROM phases WHERE phase_number = 2), 4, 'Bolt.new: Instant Prototypes', 'Rapid prototyping with Bolt', 'text', 20, 100, 9),
((SELECT id FROM phases WHERE phase_number = 2), 5, 'Cursor & Windsurf', 'AI-powered code editors', 'text', 20, 75, 10),
((SELECT id FROM phases WHERE phase_number = 2), 6, 'Choosing the Right Tool', 'When to use which AI tool', 'text', 15, 75, 11);

-- Phase 3: Web Fundamentals (5 chapters)
INSERT INTO public.lessons (phase_id, chapter_number, title, description, content_type, duration_minutes, xp_reward, order_index) VALUES
((SELECT id FROM phases WHERE phase_number = 3), 1, 'HTML Essentials', 'Structure of web pages', 'text', 25, 100, 12),
((SELECT id FROM phases WHERE phase_number = 3), 2, 'CSS Styling', 'Making your pages beautiful', 'interactive', 30, 100, 13),
((SELECT id FROM phases WHERE phase_number = 3), 3, 'JavaScript Basics', 'Adding interactivity to web pages', 'interactive', 35, 125, 14),
((SELECT id FROM phases WHERE phase_number = 3), 4, 'Responsive Design', 'Building mobile-friendly websites', 'text', 20, 100, 15),
((SELECT id FROM phases WHERE phase_number = 3), 5, 'Modern CSS with Tailwind', 'Utility-first CSS framework', 'interactive', 25, 100, 16);

-- Phase 4: React & Next.js (6 chapters)
INSERT INTO public.lessons (phase_id, chapter_number, title, description, content_type, duration_minutes, xp_reward, order_index) VALUES
((SELECT id FROM phases WHERE phase_number = 4), 1, 'React Fundamentals', 'Components, props, and state', 'text', 30, 125, 17),
((SELECT id FROM phases WHERE phase_number = 4), 2, 'React Hooks Deep Dive', 'useState, useEffect, and custom hooks', 'interactive', 35, 150, 18),
((SELECT id FROM phases WHERE phase_number = 4), 3, 'Next.js Introduction', 'The React framework for production', 'text', 25, 100, 19),
((SELECT id FROM phases WHERE phase_number = 4), 4, 'Routing & Navigation', 'Pages, layouts, and navigation in Next.js', 'text', 25, 100, 20),
((SELECT id FROM phases WHERE phase_number = 4), 5, 'Data Fetching', 'Server components and data loading', 'interactive', 30, 125, 21),
((SELECT id FROM phases WHERE phase_number = 4), 6, 'Styling in React', 'CSS Modules, Tailwind, and shadcn/ui', 'text', 25, 100, 22);

-- Phase 5: Backend Basics (5 chapters)
INSERT INTO public.lessons (phase_id, chapter_number, title, description, content_type, duration_minutes, xp_reward, order_index) VALUES
((SELECT id FROM phases WHERE phase_number = 5), 1, 'Introduction to Databases', 'SQL vs NoSQL and when to use each', 'text', 20, 100, 23),
((SELECT id FROM phases WHERE phase_number = 5), 2, 'Supabase Fundamentals', 'Backend-as-a-Service for modern apps', 'text', 30, 125, 24),
((SELECT id FROM phases WHERE phase_number = 5), 3, 'Database Design', 'Creating tables and relationships', 'interactive', 35, 150, 25),
((SELECT id FROM phases WHERE phase_number = 5), 4, 'API Routes', 'Building APIs with Next.js', 'interactive', 30, 125, 26),
((SELECT id FROM phases WHERE phase_number = 5), 5, 'Authentication', 'User auth with Supabase', 'text', 25, 100, 27);

-- Phase 6: Full-Stack Project (4 chapters)
INSERT INTO public.lessons (phase_id, chapter_number, title, description, content_type, duration_minutes, xp_reward, order_index) VALUES
((SELECT id FROM phases WHERE phase_number = 6), 1, 'Project Planning', 'Planning your Task Dashboard app', 'text', 20, 200, 28),
((SELECT id FROM phases WHERE phase_number = 6), 2, 'Building the Frontend', 'Creating the UI with React and Tailwind', 'interactive', 60, 500, 29),
((SELECT id FROM phases WHERE phase_number = 6), 3, 'Building the Backend', 'Database and API implementation', 'interactive', 60, 500, 30),
((SELECT id FROM phases WHERE phase_number = 6), 4, 'Deployment', 'Deploying to Vercel and Supabase', 'text', 30, 800, 31);

-- Phase 7: Mobile Development (5 chapters)
INSERT INTO public.lessons (phase_id, chapter_number, title, description, content_type, duration_minutes, xp_reward, order_index) VALUES
((SELECT id FROM phases WHERE phase_number = 7), 1, 'React Native Introduction', 'Building native mobile apps', 'text', 25, 100, 32),
((SELECT id FROM phases WHERE phase_number = 7), 2, 'Expo Setup & Configuration', 'Getting started with Expo', 'text', 20, 100, 33),
((SELECT id FROM phases WHERE phase_number = 7), 3, 'Mobile UI Components', 'Building mobile interfaces', 'interactive', 35, 150, 34),
((SELECT id FROM phases WHERE phase_number = 7), 4, 'Navigation & Routing', 'Multi-screen mobile apps', 'interactive', 30, 125, 35),
((SELECT id FROM phases WHERE phase_number = 7), 5, 'Device Features', 'Camera, storage, and native APIs', 'text', 25, 125, 36);

-- Phase 8: Advanced Patterns (5 chapters)
INSERT INTO public.lessons (phase_id, chapter_number, title, description, content_type, duration_minutes, xp_reward, order_index) VALUES
((SELECT id FROM phases WHERE phase_number = 8), 1, 'State Management', 'Zustand and React Query', 'text', 30, 125, 37),
((SELECT id FROM phases WHERE phase_number = 8), 2, 'Advanced Authentication', 'OAuth, sessions, and security', 'interactive', 35, 150, 38),
((SELECT id FROM phases WHERE phase_number = 8), 3, 'Performance Optimization', 'Making your apps fast', 'text', 25, 125, 39),
((SELECT id FROM phases WHERE phase_number = 8), 4, 'Testing Basics', 'Writing tests for your code', 'interactive', 30, 150, 40),
((SELECT id FROM phases WHERE phase_number = 8), 5, 'Error Handling', 'Graceful error handling patterns', 'text', 25, 150, 41);

-- Phase 9: Deployment & DevOps (4 chapters)
INSERT INTO public.lessons (phase_id, chapter_number, title, description, content_type, duration_minutes, xp_reward, order_index) VALUES
((SELECT id FROM phases WHERE phase_number = 9), 1, 'Vercel Deployment', 'Deploying Next.js applications', 'text', 20, 100, 42),
((SELECT id FROM phases WHERE phase_number = 9), 2, 'Domain & DNS Setup', 'Custom domains and SSL', 'text', 15, 100, 43),
((SELECT id FROM phases WHERE phase_number = 9), 3, 'CI/CD Pipelines', 'Automated deployments with GitHub Actions', 'interactive', 30, 150, 44),
((SELECT id FROM phases WHERE phase_number = 9), 4, 'Monitoring & Analytics', 'Tracking app performance', 'text', 20, 150, 45);

-- Phase 10: Capstone & Certification (4 chapters)
INSERT INTO public.lessons (phase_id, chapter_number, title, description, content_type, duration_minutes, xp_reward, order_index) VALUES
((SELECT id FROM phases WHERE phase_number = 10), 1, 'Capstone Project: Web App', 'Build your custom web application', 'interactive', 120, 1000, 46),
((SELECT id FROM phases WHERE phase_number = 10), 2, 'Capstone Project: Mobile App', 'Build your mobile application', 'interactive', 120, 1000, 47),
((SELECT id FROM phases WHERE phase_number = 10), 3, 'Final Assessment', 'Comprehensive course assessment', 'interactive', 60, 500, 48),
((SELECT id FROM phases WHERE phase_number = 10), 4, 'Certification & Next Steps', 'Get certified and plan your future', 'text', 20, 500, 49);

-- ============================================
-- BADGES
-- ============================================

-- Learning Badges
INSERT INTO public.badges (name, description, icon, rarity, category, criteria, xp_reward) VALUES
('First Steps', 'Complete your first lesson', '🚀', 'common', 'learning', '{"type": "lessons_completed", "count": 1}', 50),
('Quick Learner', 'Complete 5 lessons in one day', '⚡', 'common', 'learning', '{"type": "lessons_in_day", "count": 5}', 100),
('Knowledge Seeker', 'Complete 10 lessons', '📚', 'common', 'learning', '{"type": "lessons_completed", "count": 10}', 150),
('Chapter Champion', 'Complete an entire phase', '🏆', 'rare', 'learning', '{"type": "phase_completed", "count": 1}', 200),
('Halfway Hero', 'Complete 50% of the curriculum', '🌟', 'rare', 'learning', '{"type": "curriculum_percent", "count": 50}', 500),
('Code Master', 'Complete 25 lessons', '💻', 'epic', 'learning', '{"type": "lessons_completed", "count": 25}', 300),
('Curriculum Complete', 'Complete all 49 lessons', '🎓', 'legendary', 'learning', '{"type": "lessons_completed", "count": 49}', 1000);

-- Streak Badges
INSERT INTO public.badges (name, description, icon, rarity, category, criteria, xp_reward) VALUES
('Week Warrior', 'Maintain a 7-day streak', '🔥', 'rare', 'streak', '{"type": "streak", "count": 7}', 100),
('Two Week Triumph', 'Maintain a 14-day streak', '🔥', 'rare', 'streak', '{"type": "streak", "count": 14}', 200),
('Month Master', 'Maintain a 30-day streak', '📅', 'epic', 'streak', '{"type": "streak", "count": 30}', 500),
('Dedication Dynamo', 'Maintain a 60-day streak', '💪', 'epic', 'streak', '{"type": "streak", "count": 60}', 1000),
('Century Club', 'Maintain a 100-day streak', '🎯', 'legendary', 'streak', '{"type": "streak", "count": 100}', 5000);

-- Project Badges
INSERT INTO public.badges (name, description, icon, rarity, category, criteria, xp_reward) VALUES
('First Deploy', 'Deploy your first project', '🚀', 'rare', 'project', '{"type": "projects_completed", "count": 1}', 200),
('Web Builder', 'Complete Web Project 1', '🌐', 'rare', 'project', '{"type": "project_type", "value": "web1"}', 500),
('Creative Coder', 'Complete Web Project 2', '🎨', 'epic', 'project', '{"type": "project_type", "value": "web2"}', 500),
('Mobile Maven', 'Complete the Mobile Project', '📱', 'epic', 'project', '{"type": "project_type", "value": "mobile"}', 500),
('Full Stack Hero', 'Complete all 3 projects', '🦸', 'legendary', 'project', '{"type": "projects_completed", "count": 3}', 1000);

-- Community Badges
INSERT INTO public.badges (name, description, icon, rarity, category, criteria, xp_reward) VALUES
('Community Member', 'Join the community forum', '👋', 'common', 'community', '{"type": "forum_join"}', 25),
('Helpful Hand', 'Have a reply marked as solution', '🤝', 'rare', 'community', '{"type": "solutions_given", "count": 1}', 100),
('Mentor', 'Have 10 replies marked as solution', '🧑‍🏫', 'epic', 'community', '{"type": "solutions_given", "count": 10}', 500),
('Community Champion', 'Help 50 other students', '🏅', 'legendary', 'community', '{"type": "solutions_given", "count": 50}', 1000);

-- Tool Mastery Badges
INSERT INTO public.badges (name, description, icon, rarity, category, criteria, xp_reward) VALUES
('Claude Code Apprentice', 'Complete Claude Code lessons', '🤖', 'rare', 'special', '{"type": "tool_mastery", "tool": "claude"}', 200),
('Lovable Expert', 'Build an app with Lovable', '💜', 'rare', 'special', '{"type": "tool_mastery", "tool": "lovable"}', 200),
('Bolt Master', 'Create a prototype with Bolt', '⚡', 'rare', 'special', '{"type": "tool_mastery", "tool": "bolt"}', 200);

-- Special Badges
INSERT INTO public.badges (name, description, icon, rarity, category, criteria, xp_reward) VALUES
('Early Bird', 'Study before 7 AM', '🌅', 'rare', 'special', '{"type": "time_of_day", "before": 7}', 50),
('Night Owl', 'Study after 11 PM', '🦉', 'common', 'special', '{"type": "time_of_day", "after": 23}', 50),
('Perfect Quiz', 'Score 100% on any quiz', '💯', 'rare', 'special', '{"type": "quiz_perfect", "count": 1}', 100),
('Quiz Master', 'Score 100% on 10 quizzes', '🧠', 'epic', 'special', '{"type": "quiz_perfect", "count": 10}', 500),
('Certified Developer', 'Earn your certificate', '📜', 'legendary', 'special', '{"type": "certified"}', 2000);
