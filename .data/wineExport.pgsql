--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: app; Type: SCHEMA; Schema: -; Owner: wine
--

CREATE SCHEMA app;


ALTER SCHEMA app OWNER TO wine;

--
-- Name: data; Type: SCHEMA; Schema: -; Owner: wine
--

CREATE SCHEMA data;


ALTER SCHEMA data OWNER TO wine;

--
-- Name: users; Type: SCHEMA; Schema: -; Owner: wine
--

CREATE SCHEMA users;


ALTER SCHEMA users OWNER TO wine;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = app, pg_catalog;

--
-- Name: image_type_seq; Type: SEQUENCE; Schema: app; Owner: wine
--

CREATE SEQUENCE image_type_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE image_type_seq OWNER TO wine;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: image_type; Type: TABLE; Schema: app; Owner: wine
--

CREATE TABLE image_type (
    image_type_id bigint DEFAULT nextval('image_type_seq'::regclass) NOT NULL,
    image_type character varying(100) NOT NULL
);


ALTER TABLE image_type OWNER TO wine;

SET search_path = data, pg_catalog;

--
-- Name: comments_seq; Type: SEQUENCE; Schema: data; Owner: wine
--

CREATE SEQUENCE comments_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comments_seq OWNER TO wine;

--
-- Name: comments; Type: TABLE; Schema: data; Owner: wine
--

CREATE TABLE comments (
    comment_id bigint DEFAULT nextval('comments_seq'::regclass) NOT NULL,
    google_user_id character varying NOT NULL,
    wine_id bigint NOT NULL,
    "time" timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    comment text NOT NULL
);


ALTER TABLE comments OWNER TO wine;

--
-- Name: images_seq; Type: SEQUENCE; Schema: data; Owner: wine
--

CREATE SEQUENCE images_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE images_seq OWNER TO wine;

--
-- Name: images; Type: TABLE; Schema: data; Owner: wine
--

CREATE TABLE images (
    image_id bigint DEFAULT nextval('images_seq'::regclass) NOT NULL,
    wine_id bigint NOT NULL,
    filename character varying(250) NOT NULL,
    image_type_id bigint NOT NULL
);


ALTER TABLE images OWNER TO wine;

--
-- Name: ratings_seq; Type: SEQUENCE; Schema: data; Owner: wine
--

CREATE SEQUENCE ratings_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ratings_seq OWNER TO wine;

--
-- Name: ratings; Type: TABLE; Schema: data; Owner: wine
--

CREATE TABLE ratings (
    rating_id bigint DEFAULT nextval('ratings_seq'::regclass) NOT NULL,
    google_user_id character varying NOT NULL,
    wine_id bigint NOT NULL,
    rating integer NOT NULL
);


ALTER TABLE ratings OWNER TO wine;

--
-- Name: wines_seq; Type: SEQUENCE; Schema: data; Owner: wine
--

CREATE SEQUENCE wines_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE wines_seq OWNER TO wine;

--
-- Name: wines; Type: TABLE; Schema: data; Owner: wine
--

CREATE TABLE wines (
    wine_id bigint DEFAULT nextval('wines_seq'::regclass) NOT NULL,
    name character varying(250) NOT NULL,
    year integer NOT NULL,
    type character varying(250) NOT NULL,
    region character varying(250) NOT NULL
);


ALTER TABLE wines OWNER TO wine;

SET search_path = users, pg_catalog;

--
-- Name: users; Type: TABLE; Schema: users; Owner: wine
--

CREATE TABLE users (
    google_user_id character varying(100) NOT NULL,
    image_url text NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    created_date timestamp with time zone DEFAULT clock_timestamp()
);


ALTER TABLE users OWNER TO wine;

--
-- Name: users_seq; Type: SEQUENCE; Schema: users; Owner: wine
--

CREATE SEQUENCE users_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_seq OWNER TO wine;

SET search_path = app, pg_catalog;

--
-- Data for Name: image_type; Type: TABLE DATA; Schema: app; Owner: wine
--

COPY image_type (image_type_id, image_type) FROM stdin;
\.


--
-- Name: image_type_seq; Type: SEQUENCE SET; Schema: app; Owner: wine
--

SELECT pg_catalog.setval('image_type_seq', 1, false);


SET search_path = data, pg_catalog;

--
-- Data for Name: comments; Type: TABLE DATA; Schema: data; Owner: wine
--

COPY comments (comment_id, google_user_id, wine_id, "time", comment) FROM stdin;
8	114857128214334416859	21	2017-03-14 05:03:31.730455+00	-Tastes like sweet + sour juice \\n - could be tasty for summer \\n - does _NOT_ taste like chardonnay
9	114857128214334416859	22	2017-03-14 05:04:00.423692+00	Ashy
10	114857128214334416859	23	2017-03-14 05:04:29.240809+00	
11	114857128214334416859	24	2017-03-14 05:04:57.624477+00	
12	114857128214334416859	25	2017-03-14 05:05:15.938617+00	
13	114857128214334416859	26	2017-03-14 05:05:37.215042+00	
15	114857128214334416859	28	2017-03-18 02:43:25.744041+00	Spicy, bold, very tasty
16	114857128214334416859	29	2017-03-18 23:00:09.047167+00	Water wine with a bit of kick
17	114857128214334416859	30	2017-03-19 00:37:31.9503+00	Very Funky, Super Tasty
1	117295675106764402654	1	2017-03-14 02:07:37.248173+00	Just Yuck (this is a sample comment)
24	103853663754769283986	23	2017-03-23 04:39:28.965442+00	Second sample comment
27	114857128214334416859	42	2017-03-26 00:32:41.389533+00	Ashy, tasty, earthy
30	117295675106764402654	45	2017-04-01 02:55:37.894697+00	Did you take a picture yet! http://www.lariojanawines.com/riojana-fairtrade-wines  I really like this one.
32	117295675106764402654	47	2017-04-07 02:22:42.821816+00	A bit too sweet.
33	117295675106764402654	48	2017-04-07 02:33:01.463614+00	Funky. Really Dry. A little bit tart.  Leathery.
35	117295675106764402654	50	2017-04-16 03:07:24.108952+00	Don't like the way it smells.  Do like the way it tastes.  Dry on finish.  "ashy" Berry at the beginning.
37	117295675106764402654	52	2017-04-16 23:40:15.313521+00	Not too sweet, but not dry.  A little bit mineraly.
53	117295675106764402654	68	2017-05-03 03:25:32.179898+00	Surprisingly good while drunk
58	117295675106764402654	68	2017-05-03 03:39:27.641434+00	http://www.cellartracker.com/m/wines/1491217
59	117295675106764402654	73	2017-05-07 23:57:23.800723+00	Had it a day old.  By myself!
60	117295675106764402654	74	2017-05-14 04:45:07.128213+00	Fizzy. Smells and tastes like something.  Carrots maybe?
\.


--
-- Name: comments_seq; Type: SEQUENCE SET; Schema: data; Owner: wine
--

SELECT pg_catalog.setval('comments_seq', 60, true);


--
-- Data for Name: images; Type: TABLE DATA; Schema: data; Owner: wine
--

COPY images (image_id, wine_id, filename, image_type_id) FROM stdin;
1	1	angeline_cali_chard_14_750.png	1
2	23	Iron-Side-Cab1.png	1
3	21	laurel-cellars-chardonnay-central-coast-usa-10748627.jpg	1
4	22	bric-del-salto.jpg	1
5	24	Cusumano.jpeg	1
6	25	Bodegas.JPG	1
7	28	MugaReserva.JPG	1
8	29	VinaZaco.jpeg	1
9	26	Dupeuble.jpg	1
10	30	chatrois-2014-bertrand-galbrun.jpg	1
17	47	DSC_0030-1496464388027.JPG	1
18	68	IMAG0180-1496465537025.jpg	1
19	52	sauvignon-blanc-big-1496670894577.png	1
\.


--
-- Name: images_seq; Type: SEQUENCE SET; Schema: data; Owner: wine
--

SELECT pg_catalog.setval('images_seq', 19, true);


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: data; Owner: wine
--

COPY ratings (rating_id, google_user_id, wine_id, rating) FROM stdin;
1	114857128214334416859	1	1
2	114857128214334416859	20	2
3	114857128214334416859	21	2
4	114857128214334416859	22	4
6	114857128214334416859	24	3
7	114857128214334416859	25	5
9	114857128214334416859	27	3
10	114857128214334416859	28	4
11	114857128214334416859	29	3
5	114857128214334416859	23	3
8	114857128214334416859	26	3
12	114857128214334416859	30	4
13	114857128214334416859	31	1
14	114857128214334416859	32	2
15	114857128214334416859	33	2
16	114857128214334416859	34	5
17	114857128214334416859	35	1
18	114857128214334416859	36	2
19	117295675106764402654	41	5
20	114857128214334416859	42	4
21	117295675106764402654	43	1
22	117295675106764402654	44	1
23	117295675106764402654	45	4
24	117295675106764402654	46	2
25	117295675106764402654	47	2
26	117295675106764402654	48	4
27	117295675106764402654	49	3
28	117295675106764402654	50	4
29	117295675106764402654	51	4
30	117295675106764402654	52	3
31	117295675106764402654	53	4
32	117295675106764402654	54	3
33	117295675106764402654	55	4
37	117295675106764402654	59	3
38	117295675106764402654	60	3
39	117295675106764402654	61	2
40	117295675106764402654	62	2
41	117295675106764402654	63	2
42	117295675106764402654	64	3
43	117295675106764402654	65	2
44	117295675106764402654	66	4
45	117295675106764402654	67	4
46	117295675106764402654	68	4
47	117295675106764402654	69	4
48	117295675106764402654	70	4
49	117295675106764402654	71	4
50	117295675106764402654	72	4
51	117295675106764402654	73	3
52	117295675106764402654	74	2
\.


--
-- Name: ratings_seq; Type: SEQUENCE SET; Schema: data; Owner: wine
--

SELECT pg_catalog.setval('ratings_seq', 52, true);


--
-- Data for Name: wines; Type: TABLE DATA; Schema: data; Owner: wine
--

COPY wines (wine_id, name, year, type, region) FROM stdin;
1	Angeline California Chardonnay	2015	Chardonnay	California
73	Starborough	2015	Sauvignon Blanc	Marlborough New Zealand
74	K-Pot	2015	Malbec	Cahors, France
21	Laurel Cellars	2013	Chardonnay	Central Coast
22	Bric Del Salto	2015	Dolcetto DAlba	Neive Italia
23	Iron Side	2015	Cabernet Sauvignon	California
24	Cusumano	2015	Nero d'avola	Terre siciliana
25	BODEGAS FRANCO-ESPANOLAS RIOJA RESERVA BORDON	2011	Rioja	Spain
26	Dupeuble Pere Et Fils Beaujolais	2015	Beaujolais	Burgundy, France
30	Bourgueil 'Chatrois' Betrand Galbrun	2014	Cabernet Franc	Loire, France
29	Viña Zaco	2014	Tempranillo	Rioja
28	Muga Reserva	2012	Tempranillo/mazuelo	Haro, españa
42	Gouleyant	2014	Malbec	? France
45	Riojana Fairtrade Malbec Reserve	2016	Malbec	Argentina
47	La Cabotte Côtes Du Rhône	2015	Blend	Colline
48	Succés La Cuca Dellum	2014	?	Conca de Barbera
50	Hazaña	2014	Rioja	Spain
52	Seaglass	2015	Sauvignon Blanc	Santa Barbra County
68	Couly-Dutheil Chinon La Coulée Automnale	2015	Cabernet Franc	Loire Valley Touraine France
\.


--
-- Name: wines_seq; Type: SEQUENCE SET; Schema: data; Owner: wine
--

SELECT pg_catalog.setval('wines_seq', 74, true);


SET search_path = users, pg_catalog;

--
-- Data for Name: users; Type: TABLE DATA; Schema: users; Owner: wine
--

COPY users (google_user_id, image_url, first_name, last_name, email, created_date) FROM stdin;
103853663754769283986	https://lh3.googleusercontent.com/-LjXLw654-HM/AAAAAAAAAAI/AAAAAAAAAAc/gG2zJsp8uqw/s96-c/photo.jpg	Hans	Vorsteveld	athvorsteveld@gmail.com	2017-03-17 04:16:36.06849+00
114857128214334416859	https://lh4.googleusercontent.com/-zuNW0Vjy0cE/AAAAAAAAAAI/AAAAAAAAAEA/gG2zJsp8uqw/s96-c/photo.jpg	Jim	Bob	jimbob@example.com	2017-03-18 02:47:59.130713+00
117295675106764402654	https://lh3.googleusercontent.com/-zuNW0Vjy0cE/AAAAAAAAAAI/AAAAAAAAAAA/AAyYBF5zDdyGpEogh37APDUpics5UV9gvA/s96-c/photo.jpg	Hans	Vorsteveld	hvorsteveld@gmail.com	2017-03-17 04:09:36.280645+00
\.


--
-- Name: users_seq; Type: SEQUENCE SET; Schema: users; Owner: wine
--

SELECT pg_catalog.setval('users_seq', 10, true);


SET search_path = app, pg_catalog;

--
-- Name: image_type image_type_pk; Type: CONSTRAINT; Schema: app; Owner: wine
--

ALTER TABLE ONLY image_type
    ADD CONSTRAINT image_type_pk PRIMARY KEY (image_type_id);


SET search_path = data, pg_catalog;

--
-- Name: comments comments_pk; Type: CONSTRAINT; Schema: data; Owner: wine
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pk PRIMARY KEY (comment_id);


--
-- Name: images images_pk; Type: CONSTRAINT; Schema: data; Owner: wine
--

ALTER TABLE ONLY images
    ADD CONSTRAINT images_pk PRIMARY KEY (image_id);


--
-- Name: ratings ratings_pk; Type: CONSTRAINT; Schema: data; Owner: wine
--

ALTER TABLE ONLY ratings
    ADD CONSTRAINT ratings_pk PRIMARY KEY (rating_id);


--
-- Name: wines wines_pk; Type: CONSTRAINT; Schema: data; Owner: wine
--

ALTER TABLE ONLY wines
    ADD CONSTRAINT wines_pk PRIMARY KEY (wine_id);


SET search_path = users, pg_catalog;

--
-- Name: users users_un_google_id; Type: CONSTRAINT; Schema: users; Owner: wine
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_un_google_id UNIQUE (google_user_id);


--
-- PostgreSQL database dump complete
--

