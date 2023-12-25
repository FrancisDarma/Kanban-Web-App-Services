--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE mypostgres;
ALTER ROLE mypostgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:7kWUgGt/6f7LFCNE4gevgg==$KapwUpmz+0chNWLG14YAoG3iFX0rVssDThqko1Eoeuw=:Zxt3xUKGIt2xgE9IBshBvIYkrwTWPzA+LIl3WxH3rrQ=';






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Debian 14.10-1.pgdg120+1)
-- Dumped by pg_dump version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "flask-app_db" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Debian 14.10-1.pgdg120+1)
-- Dumped by pg_dump version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: flask-app_db; Type: DATABASE; Schema: -; Owner: mypostgres
--

CREATE DATABASE "flask-app_db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE "flask-app_db" OWNER TO mypostgres;

\connect -reuse-previous=on "dbname='flask-app_db'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: mypostgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO mypostgres;

--
-- Name: blacklist_token; Type: TABLE; Schema: public; Owner: mypostgres
--

CREATE TABLE public.blacklist_token (
    id integer NOT NULL,
    jti character varying(36) NOT NULL
);


ALTER TABLE public.blacklist_token OWNER TO mypostgres;

--
-- Name: blacklist_token_id_seq; Type: SEQUENCE; Schema: public; Owner: mypostgres
--

CREATE SEQUENCE public.blacklist_token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blacklist_token_id_seq OWNER TO mypostgres;

--
-- Name: blacklist_token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mypostgres
--

ALTER SEQUENCE public.blacklist_token_id_seq OWNED BY public.blacklist_token.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: mypostgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying(64) NOT NULL,
    description character varying(1024),
    status boolean,
    user_id integer
);


ALTER TABLE public.tasks OWNER TO mypostgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: mypostgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO mypostgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mypostgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: mypostgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(64) NOT NULL,
    email character varying(128) NOT NULL,
    password character varying(1024) NOT NULL
);


ALTER TABLE public.users OWNER TO mypostgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: mypostgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO mypostgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mypostgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: blacklist_token id; Type: DEFAULT; Schema: public; Owner: mypostgres
--

ALTER TABLE ONLY public.blacklist_token ALTER COLUMN id SET DEFAULT nextval('public.blacklist_token_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: mypostgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: mypostgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: mypostgres
--

COPY public.alembic_version (version_num) FROM stdin;
f6e66a085dd7
\.


--
-- Data for Name: blacklist_token; Type: TABLE DATA; Schema: public; Owner: mypostgres
--

COPY public.blacklist_token (id, jti) FROM stdin;
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: mypostgres
--

COPY public.tasks (id, title, description, status, user_id) FROM stdin;
1	Kerjain Thesis S2	Dikit lagi	f	1
2	Beli Chatime	Minum chatime	t	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: mypostgres
--

COPY public.users (user_id, name, email, password) FROM stdin;
1	Andika Darmawan	bisnisandikadarmawan@gmail.com	scrypt:32768:8:1$GojjI0QNFWknCgpn$4d1dd4f11501d558f3920ae3a99dd4437b4dbd3a7cebf0ef5a422afcc576f4cb1c3116bf7aba6c0f665dbdc23e5c43c48c50b6099c82e6dceacaed3fe5b04206
\.


--
-- Name: blacklist_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mypostgres
--

SELECT pg_catalog.setval('public.blacklist_token_id_seq', 1, false);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mypostgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 2, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mypostgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: mypostgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: blacklist_token blacklist_token_jti_key; Type: CONSTRAINT; Schema: public; Owner: mypostgres
--

ALTER TABLE ONLY public.blacklist_token
    ADD CONSTRAINT blacklist_token_jti_key UNIQUE (jti);


--
-- Name: blacklist_token blacklist_token_pkey; Type: CONSTRAINT; Schema: public; Owner: mypostgres
--

ALTER TABLE ONLY public.blacklist_token
    ADD CONSTRAINT blacklist_token_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: mypostgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_name_key; Type: CONSTRAINT; Schema: public; Owner: mypostgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_name_key UNIQUE (name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: mypostgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: tasks tasks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mypostgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Debian 14.10-1.pgdg120+1)
-- Dumped by pg_dump version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

