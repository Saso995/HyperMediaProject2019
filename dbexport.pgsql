--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: authors; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.authors (
    id integer NOT NULL,
    name character varying(30),
    bio text
);


ALTER TABLE public.authors OWNER TO me;

--
-- Name: authors_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.authors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.authors_id_seq OWNER TO me;

--
-- Name: authors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.authors_id_seq OWNED BY public.authors.id;


--
-- Name: books; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.books (
    id integer NOT NULL,
    isbn character varying(20) NOT NULL,
    title character varying(255) NOT NULL,
    authorid integer,
    price double precision,
    pages integer,
    lang character varying(20),
    publicationdate date,
    genre character varying(50),
    theme character varying(50),
    description text,
    bestseller boolean,
    favorite boolean
);


ALTER TABLE public.books OWNER TO me;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_id_seq OWNER TO me;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.events (
    id integer NOT NULL,
    authorid integer,
    bookid integer,
    location character varying(255),
    date date
);


ALTER TABLE public.events OWNER TO me;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO me;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.reviews (
    userid integer NOT NULL,
    bookid integer NOT NULL,
    reviewid integer NOT NULL,
    message text NOT NULL,
    rating integer NOT NULL
);


ALTER TABLE public.reviews OWNER TO me;

--
-- Name: reviews_reviewid_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.reviews_reviewid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_reviewid_seq OWNER TO me;

--
-- Name: reviews_reviewid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.reviews_reviewid_seq OWNED BY public.reviews.reviewid;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.sessions (
    sid character varying(255) NOT NULL,
    sess json NOT NULL,
    expired timestamp with time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO me;

--
-- Name: users; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(128),
    password character varying(255),
    firstname character varying(128),
    lastname character varying(128),
    birthdate date,
    address text
);


ALTER TABLE public.users OWNER TO me;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO me;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: authors id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.authors ALTER COLUMN id SET DEFAULT nextval('public.authors_id_seq'::regclass);


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: reviews reviewid; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.reviews ALTER COLUMN reviewid SET DEFAULT nextval('public.reviews_reviewid_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.authors (id, name, bio) FROM stdin;
2	J. R. R. Tolkien	(3 January 1892 – 2 September 1973) Was an English writer, poet, philologist, and academic, who is best known as the author of the classic high fantasy works The Hobbit, The Lord of the Rings, and The Silmarillion.\n\nHe served as the Rawlinson and Bosworth Professor of Anglo-Saxon and Fellow of Pembroke College, Oxford, from 1925 to 1945 and Merton Professor of English Language and Literature and Fellow of Merton College, Oxford, from 1945 to 1959. He was at one time a close friend of C. S. Lewis—they were both members of the informal literary discussion group known as the Inklings. Tolkien was appointed a Commander of the Order of the British Empire by Queen Elizabeth II on 28 March 1972.
1	J. K. Rowling	(31 July 1965), writing under the pen names J. K. Rowling and Robert Galbraith, is a British novelist, philanthropist, film producer, television producer and screenwriter, best known for writing the Harry Potter fantasy series. The books have won multiple awards, and sold more than 500 million copies, becoming the best-selling book series in history.They have also been the basis for a film series, over which Rowling had overall approval on the scripts and was a producer on the final films in the series.
3	Carlos Ruiz Zafón	Ruiz Zafón was born in the city of Barcelona. Growing up in Spain, he began his work life by making money in advertising. His grandparents had worked in a factory and his father sold insurance.In the 1990s Ruiz Zafón moved to Los Angeles where he worked briefly in screen writing. Catalan by birth and also fluent in English, he writes and publishes his novels in Spanish. This not only enables a larger readership, via readers in Spain and South America, but also allows his novels to speak more widely for the country of Spain, in a way that novels written in Catalan or English would not.
4	Stephen King	Stephen Edwin King (born September 21, 1947) is an American author of horror, supernatural fiction, suspense, science fiction, and fantasy. His books have sold more than 350 million copies, many of which have been adapted into feature films, miniseries, television series, and comic books. King has published 58 novels (including seven under the pen name Richard Bachman) and six non-fiction books. He has written approximately 200 short stories, most of which have been published in book collections.
5	Dan Brown	Daniel Gerhard Brown (born June 22, 1964) is an American author most well known for his thriller novels, including the Robert Langdon stories, Angels & Demons (2000), The Da Vinci Code (2003), The Lost Symbol (2009), Inferno (2013) and Origin (2017). His novels are treasure hunts set in a 24-hour period, and feature the recurring themes of cryptography, keys, symbols, codes, art, and conspiracy theories. His books have been translated into 57 languages, and as of 2012, sold over 200 million copies. Three of them, Angels & Demons (2000), The Da Vinci Code (2003) and Inferno (2013) have been adapted into films.
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.books (id, isbn, title, authorid, price, pages, lang, publicationdate, genre, theme, description, bestseller, favorite) FROM stdin;
1	0-7475-3269-9	harry potter and the philosopher's stone	1	14.9900000000000002	332	English	1997-06-26	fantasy	magic,friendship,school	Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!	f	f
2	0-7475-3849-2	harry potter and the chamber of secrets	1	15.9900000000000002	360	English	1998-07-02	fantasy	magic,friendship,school	Between the new spirit spooking his school and the mysterious forces that turn students into stone, Harry has a lot on his mind as he begins his second year at Hogwarts School of Witchcraft and Wizardry. 	f	f
3	0-7475-4215-5	harry potter and the prisoner of azkaban	1	18.9899999999999984	435	English	1999-07-08	fantasy	magic,friendship,school	When the Knight Bus crashes through the darkness and screeches to a halt in front of him, it's the start of another far from ordinary year at Hogwarts for Harry Potter. Sirius Black, escaped mass-murderer and follower of Lord Voldemort, is on the run - and they say he is coming after Harry. In his first ever Divination class, Professor Trelawney sees an omen of death in Harry's tea leaves . But perhaps most terrifying of all are the Dementors patrolling the school grounds, with their soul-sucking kiss.	f	f
6	0-7475-8108-8	harry potter and the half-blood prince	1	21.9899999999999984	607	English	2005-07-16	fantasy	magic,friendship,school,death	When Dumbledore arrives at Privet Drive one summer night to collect Harry Potter, his wand hand is blackened and shrivelled, but he does not reveal why. Secrets and suspicion are spreading through the wizarding world, and Hogwarts itself is not safe. Harry is convinced that Malfoy bears the Dark Mark: there is a Death Eater amongst them. Harry will need powerful magic and true friends as he explores Voldemort's darkest secrets, and Dumbledore prepares him to face his destiny	t	f
7	0-545-01022-5	harry potter and the deathly hallows	1	24.9899999999999984	759	English	2003-06-21	fantasy	magic,friendship,school	As he climbs into the sidecar of Hagrid's motorbike and takes to the skies, leaving Privet Drive for the last time, Harry Potter knows that Lord Voldemort and the Death Eaters are not far behind. The protective charm that has kept Harry safe until now is now broken, but he cannot keep hiding. The Dark Lord is breathing fear into everything Harry loves, and to stop him Harry will have to find and destroy the remaining Horcruxes. The final battle must begin - Harry must stand and face his enemy.	t	f
4	0-7475-4624-X	harry potter and the goblet of fire	1	18.9899999999999984	636	English	2000-07-08	fantasy	magic,friendship,school	The Triwizard Tournament is to be held at Hogwarts. Only wizards who are over seventeen are allowed to enter - but that doesn't stop Harry dreaming that he will win the competition. Then at Hallowe'en, when the Goblet of Fire makes its selection, Harry is amazed to find his name is one of those that the magical cup picks out. He will face death-defying tasks, dragons and Dark wizards, but with the help of his best friends, Ron and Hermione, he might just make it through - alive!	f	f
18	978-0-385-50422-5	the lost symbol	5	19.9899999999999984	671	English	2009-09-15	crime, mistery, thriller	religion, symbology,art,architecture,history	Famed Harvard symbologist Robert Langdon answers an unexpected summons to appear at the U.S. Capitol Building. His plans are interrupted when a disturbing object—artfully encoded with five symbols—is discovered in the building. Langdon recognizes in the find an ancient invitation into a lost world of esoteric, potentially dangerous wisdom. \n\nWhen his mentor Peter Solomon—a long-standing Mason and beloved philanthropist—is kidnapped, Langdon realizes that the only way to save Solomon is to accept the mystical invitation and plunge headlong into a clandestine world of Masonic secrets, hidden history, and one inconceivable truth . . . all under the watchful eye of Dan Brown's most terrifying villain to date. Set within the hidden chambers, tunnels, and temples of Washington, D.C., The Lost Symbol is an intelligent, lightning-paced story with surprises at every turn—one of Brown's most riveting novels.	t	f
5	0-7475-5100-6	harry potter and the order of the phoenix	1	21.9899999999999984	800	English	2003-06-21	fantasy	magic,friendship,school	Dark times have come to Hogwarts. After the Dementors' attack on his cousin Dudley, Harry Potter knows that Voldemort will stop at nothing to find him. There are many who deny the Dark Lord's return, but Harry is not alone: a secret order gathers at Grimmauld Place to fight against the Dark forces. Harry must allow Professor Snape to teach him how to protect himself from Voldemort's savage assaults on his mind. But they are growing stronger by the day and Harry is running out of time.	f	f
19	0-671-02735-2	angels & demons	5	21.9899999999999984	616	English	2000-02-21	thriller	religion, mistery, history	CERN Institute, Switzerland: a world-renowned scientist is found brutally murdered with a mysterious symbol seared onto his chest. \n\nThe Vatican, Rome: the College of Cardinals assembles to elect a new pope. Somewhere beneath them, an unstoppable bomb of terrifying power relentlessly counts down to oblivion. \n\nIn a breathtaking race against time, Harvard professor Robert Langdon must decipher a labyrinthine trail of ancient symbols if he is to defeat those responsible - the Illuminati, a secret brotherhood presumed extinct for nearly four hundred years, reborn to continue their deadly vendetta against their most hated enemy, the Catholic Church.	f	f
9	9786070712715	the hobbit	2	21.9899999999999984	310	English	1937-09-21	fantasy, adventure	magic,friendship,war	The Hobbit is the story of Bilbo Baggins, a quiet and contented hobbit whose life is turned upside down when he joins the wizard Gandalf and thirteen dwarves on their quest to reclaim their stolen treasure. It is a journey fraught with danger – and in the end it is Bilbo alone who must face the guardian of this treasure, the most-dreaded dragon, Smaug.	f	f
8	9780007149230	the lord of the rings	2	34.990000000000002	1200	English	1954-07-29	fantasy, adventure	war,friendship, power, responsability	Presents the epic depicting the Great War of the Ring, a struggle between good and evil in Middle-earth, following the odyssey of Frodo the hobbit and his companions on a quest to destroy the Ring of Power, in a special anniversary volume containing the corrected text of all three volumes of the seminal fantasy trilogy, complemented by maps and cover art by acclaimed artist Alan Lee.	f	t
12	978-84-08-08118-0	the angel's game	3	17.9899999999999984	672	Spanish	2008-04-17	mistery, thriller	friendship, love, intrigue, anxiety	In this powerful, labyrinthian thriller, David Martín is a pulp fiction writer struggling to stay afloat. Holed up in a haunting abandoned mansion in the heart of Barcelona, he furiously taps out story after story, becoming increasingly desperate and frustrated. Thus, when he is approached by a mysterious publisher offering a book deal that seems almost too good to be real, David leaps at the chance. But as he begins the work, and after a visit to the Cemetery of Forgotten Books, he realizes that there is a connection between his book and the shadows that surround his dilapidated home and that the publisher may be hiding a few troubling secrets of his own. Once again, Ruiz Zafón takes us into a dark, gothic Barcelona and creates a breathtaking tale of intrigue, romance, and tragedy	f	f
13	978-0062206282	the prisoner of heaven	3	18.9899999999999984	288	Spanish	2012-07-10	mistery, thriller	friendship, love, anxiety, war	In 1957 Barcelona, Daniel Semper and his close friend Fermin Romero de Torres find their lives violently disrupted by the arrival of a mysterious stranger who threatens to divulge a terrible secret that has been buried for two decades in the city's dark past	f	t
10	0-04-823139-8	the silmarillion	2	12.9900000000000002	365	English	1977-09-15	fantasy	magic	The Silmarillion is an account of the Elder Days, of the First Age of Tolkien’s world. It is the ancient drama to which the characters in The Lord of the Rings look back, and in whose events some of them such as Elrond and Galadriel took part. The tales of The Silmarillion are set in an age when Morgoth, the first Dark Lord, dwelt in Middle-Earth, and the High Elves made war upon him for the recovery of the Silmarils, the jewels containing the pure light of Valinor.	f	t
20	0-385-50420-9	the da vinci code	5	22.9899999999999984	689	English	2003-04-15	mystery, detective fiction,thriller	religion, symbology,art,architecture,history	While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum, his body covered in baffling symbols. As Langdon and gifted French cryptologist Sophie Neveu sort through the bizarre riddles, they are stunned to discover a trail of clues hidden in the works of Leonardo da Vinci—clues visible for all to see and yet ingeniously disguised by the painter.\n\nEven more startling, the late curator was involved in the Priory of Sion—a secret society whose members included Sir Isaac Newton, Victor Hugo, and Da Vinci—and he guarded a breathtaking historical secret. Unless Langdon and Neveu can decipher the labyrinthine puzzle—while avoiding the faceless adversary who shadows their every move—the explosive, ancient truth will be lost forever.	t	t
11	84-08-05793-6	the shadow of the wind	3	14.9900000000000002	565	Spanish	2001-04-17	mystery	books, adventure, love	A boy named Daniel selects a novel from a library of rare books, enjoying it so much that he searches for the rest of the author's works, only to discover that someone is destroying every book the author has ever written.	t	t
14	9781443454001	the labyrinth of spirits	3	22.9899999999999984	552	Spanish	2016-11-17	mistery, thriller	friendship, love, anxiety	Nine-year-old Alicia lost her parents during the Spanish Civil War when the Nacionales (the fascists) savagely bombed Barcelona in 1938. Twenty years later, she still carries the emotional and physical scars of that violent and terrifying time. Weary of her work as an investigator for Spain’s secret police in Madrid, a job she has held for more than a decade, the twenty-nine-year old plans to move on. At the insistence of her boss, Leandro Montalvo, she remains to solve one last case: the mysterious disappearance of Spain’s Minister of Culture, Mauricio Valls.\n\nWith her partner, the intimidating policeman Juan Manuel Vargas, Alicia discovers a possible clue—a rare book by the author Victor Mataix hidden in Valls’ office in his Madrid mansion. Valls was the director of the notorious Montjuic Prison in Barcelona during World War II where several writers were imprisoned, including David Martín and Victor Mataix. Traveling to Barcelona on the trail of these writers, Alicia and Vargas meet with several booksellers, including Juan Sempere, who knew her parents.\n\nAs Alicia and Vargas come closer to finding Valls, they uncover a tangled web of kidnappings and murders tied to the Franco regime, whose corruption is more widespread and horrifying than anyone imagined. Alicia’s courageous and uncompromising search for the truth puts her life in peril. Only with the help of a circle of devoted friends will she emerge from the dark labyrinths of Barcelona and its history into the light of the future.\n\nIn this haunting new novel, Carlos Ruiz Zafón proves yet again that he is a masterful storyteller and pays homage to the world of books, to his ingenious creation of the Cemetery of Forgotten, and to that magical bridge between literature and our lives	t	t
15	9781501138324	the green mile	4	13.5	477	English	1996-08-22	dark fantasy, southern gothic	realism, prison, sin	In a chilling novel by the author of Carrie and The Stand, a new prisoner at Cold Mountain Penitentiary presents an unusual dilemma for jaded prison guard Paul Edgecombe.	f	f
16	978-0-670-83953-7	needful things	4	14.5	388	English	1991-10-13	horror	dead, fight, sorrow	A new store has opened in the town of Castle Rock, Maine. It has whatever your heart desires . . . if you're willing to pay the price. In this chilling novel by one of the most potent imaginations of our time, evil is on a shopping spree and out to scare you witless.	f	f
17	978-0-670-26077-5	the dead zone	4	17.5	428	English	1979-08-04	horror, supernatural thriller	dead, sorrow, anxiety	Johnny Smith awakens from a five-year coma after his car accident and discovers that he can see people's futures and pasts when he touches them. Many consider his talent a gift; Johnny feels cursed. His fiancée married another man during his coma and people clamor for him to solve their problems.\n\nWhen Johnny has a disturbing vision after he shakes the hand of an ambitious and amoral politician, he must decide if he should take drastic action to change the future. With “powerful tension that holds the reader to the story like a pin to a magnet”	t	f
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.events (id, authorid, bookid, location, date) FROM stdin;
1	3	14	Feltrinelli P.za Duomo, 20121 Milano	2019-05-20
2	3	14	Via Appia Nuova, 51, 00183 Roma	2019-05-22
3	3	14	Corso Vittorio Emanuele II, 10125 Torino	2019-05-18
4	5	18	Feltrinelli P.za Duomo, 20121 Milano	2019-07-20
5	5	18	Via Appia Nuova, 51, 00183 Roma	2019-07-22
6	5	18	Corso Vittorio Emanuele II, 10125 Torino	2019-07-18
7	1	7	Feltrinelli P.za Duomo, 20121 Milano	2019-01-20
8	1	7	Via Appia Nuova, 51, 00183 Roma	2019-01-22
9	1	7	Corso Vittorio Emanuele II, 10125 Torino	2019-01-18
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.reviews (userid, bookid, reviewid, message, rating) FROM stdin;
1	1	1	It is really a good book.	4
2	1	3	I prefer books with more action.	2
1	2	15	Much better than the first book! I think that the huge snake at the end helped ahhaha No match with the enemy of the first book...	5
1	3	16	THIS BOOK is a must have! Its the best of the saga until now! Im in love with Sirius Black	5
1	4	17	The Goblet of Fire is when things really begin to heat up in Harrys story, his relationships with friends and peers become more complex, his sense of duty and courage become more defined and the plot line itself begins to move in a more certain and structured direction.	4
1	18	18	Fantasy book are better! You should not read this stuff... Fantasy book are better!	1
1	17	19	I bought this book because I love the movie! I hope they are similar :	3
1	13	22	My favorite book..........................why do I have to write at least 40 char?!	5
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.sessions (sid, sess, expired) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.users (id, email, password, firstname, lastname, birthdate, address) FROM stdin;
1	salvatore_bova@hotmail.it	$2b$10$UG7vsyi1K1LVDKH2d/Yt.uMTJESnyuBtfP405sja4AuuPvGSBv3.G	salvatore	bova	1995-05-20	via pietrecalcine trav 3 n 2
2	luca.colombo50@mail.polimi.it	$2b$10$VPEujpdwG.RD9oIULPQn/urQvXrEb2Ta6S7xHTEobFsz5NJTqDZrC	luca	colombo	1995-03-04	piazza duomo 1, Milano
\.


--
-- Name: authors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.authors_id_seq', 5, true);


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.books_id_seq', 21, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.events_id_seq', 9, true);


--
-- Name: reviews_reviewid_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.reviews_reviewid_seq', 26, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (userid, bookid);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions_expired_index; Type: INDEX; Schema: public; Owner: me
--

CREATE INDEX sessions_expired_index ON public.sessions USING btree (expired);


--
-- PostgreSQL database dump complete
--

