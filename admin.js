/* ==========================================================================
   Ghar Aangan - Super Admin Dashboard Script
   ========================================================================== */

// 1. Supabase Initialization
const SUPABASE_URL = 'https://nliyrssnkfaghwyqvsrm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5saXlyc3Nua2ZhZ2h3eXF2c3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MjE4ODYsImV4cCI6MjA5ODk5Nzg4Nn0.0SjFK9e5k766kXz1huQ59ACQvB6LU8XsW9Jc_D1W0Zk';

let supabaseClient = null;
if (typeof window.supabase !== 'undefined') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Indian States and Cities dataset for auto-complete select option
const indianStatesAndCities = {
    "Andaman & Nicobar": [
        "Alipur",
        "Andaman Island",
        "Anderson Island",
        "Arainj-Laka-Punga",
        "Austinabad",
        "Bamboo Flat",
        "Barren Island",
        "Beadonabad",
        "Betapur",
        "Bindraban",
        "Bonington",
        "Brookesabad",
        "Cadell Point",
        "Calicut",
        "Chetamale",
        "Cinque Islands",
        "Defence Island",
        "Digilpur",
        "Dolyganj",
        "Flat Island",
        "Geinyale",
        "Great Coco Island",
        "Haddo",
        "Havelock Island",
        "Henry Lawrence Island",
        "Herbertabad",
        "Hobdaypur",
        "Ilichar",
        "Ingoie",
        "Inteview Island",
        "Jangli Ghat",
        "Jhon Lawrence Island",
        "KYD Islannd",
        "Karen",
        "Kartara",
        "Landfall Island",
        "Little Andmand",
        "Little Coco Island",
        "Long Island",
        "Maimyo",
        "Malappuram",
        "Manglutan",
        "Manpur",
        "Mitha Khari",
        "Neill Island",
        "Nicobar Island",
        "North Brother Island",
        "North Passage Island",
        "North Sentinel Island",
        "Nothen Reef Island",
        "Outram Island",
        "Pahlagaon",
        "Palalankwe",
        "Passage Island",
        "Phaiapong",
        "Phoenix Island",
        "Port Blair",
        "Preparis Island",
        "Protheroepur",
        "Rangachang",
        "Rongat",
        "Rutland Island",
        "Sabari",
        "Saddle Peak",
        "Shadipur",
        "Smith Island",
        "Sound Island",
        "South Sentinel Island",
        "Spike Island",
        "Tarmugli Island",
        "Taylerabad",
        "Titaije",
        "Toibalawe",
        "Tusonabad",
        "West Island",
        "Wimberleyganj",
        "Yadita"
    ],
    "Andhra Pradesh": [
        "Adoni",
        "Alampur",
        "Allagadda",
        "Alur",
        "Amalapuram",
        "Amangallu",
        "Anakapalle",
        "Anantapur",
        "Andole",
        "Araku",
        "Atmakur",
        "B. Kothakota",
        "Badvel",
        "Banaganapalle",
        "Bandar",
        "Bangarupalem",
        "Bapatla",
        "Bheemunipatnam",
        "Bhimadole",
        "Bhimavaram",
        "Bobbili",
        "Chavitidibbalu",
        "Chejerla",
        "Chepurupalli",
        "Chintalapudi",
        "Chintapalle",
        "Chirala",
        "Chittoor",
        "Chodavaram",
        "Cuddapah",
        "Cumbum",
        "Darsi",
        "Dharmavaram",
        "Divi",
        "Donakonda",
        "Dronachalam",
        "East Godavari",
        "Eluru",
        "Gajapathinagaram",
        "Garladinne",
        "Giddalur",
        "Godavari",
        "Gooty",
        "Gudivada",
        "Gudur",
        "Guntur",
        "Hindupur",
        "Jaggayyapet",
        "Jammalamadugu",
        "Kadiri",
        "Kaikaluru",
        "Kakinada",
        "Kalyandurg",
        "Kamalapuram",
        "Kambadur",
        "Kanaganapalle",
        "Kandukuru",
        "Kanigiri",
        "Kavali",
        "Koduru",
        "Koilkuntla",
        "Kovvur",
        "Krishna",
        "Krosuru",
        "Kuppam",
        "Kurnool",
        "Lakkireddipalli",
        "Madakasira",
        "Madanapalli",
        "Madnur",
        "Mandapeta",
        "Mangalagiri",
        "Markapur",
        "Marturu",
        "Medarmetla",
        "Mylavaram",
        "Nallacheruvu",
        "Nandigama",
        "Nandikotkur",
        "Nandyal",
        "Narasampet",
        "Narasaraopet",
        "Narsapur",
        "Narsipatnam",
        "Nazvidu",
        "Nelloe",
        "Nellore",
        "Nidamanur",
        "Ongole",
        "Outsarangapalle",
        "Paderu",
        "Pakala",
        "Palakonda",
        "Paland",
        "Palmaneru",
        "Pamuru",
        "Parvathipuram",
        "Pathapatnam",
        "Pattikonda",
        "Peapalle",
        "Peddapuram",
        "Penukonda",
        "Piduguralla",
        "Piler",
        "Pithapuram",
        "Podili",
        "Polavaram",
        "Prakasam",
        "Proddatur",
        "Pulivendla",
        "Punganur",
        "Putturu",
        "Rajahmundri",
        "Rajampeta",
        "Rampachodavaram",
        "Rangareddy",
        "Rapur",
        "Rayachoti",
        "Rayadurg",
        "Razole",
        "Repalle",
        "Saluru",
        "Sattenapalle",
        "Satyavedu",
        "Siddavattam",
        "Sileru",
        "Sodam",
        "Sompeta",
        "Srikakulam",
        "Srikalahasthi",
        "Srisailam",
        "Srungavarapukota",
        "Sullarpet",
        "Tadepalligudem",
        "Tadipatri",
        "Tanuku",
        "Tekkali",
        "Tenali",
        "Tirivuru",
        "Tirupathi",
        "Tuni",
        "Udaygiri",
        "Ulvapadu",
        "Uravakonda",
        "V.R. Puram",
        "Vaimpalli",
        "Vayalpad",
        "Venkatgiri",
        "Venkatgirikota",
        "Vijayawada",
        "Vinjamuru",
        "Vinukonda",
        "Visakhapatnam",
        "Vizayanagaram",
        "Vizianagaram",
        "Vuyyuru",
        "Yelamanchili",
        "Yelavaram",
        "Yeleswaram",
        "Yellanuru",
        "Yerragondapalem"
    ],
    "Arunachal Pradesh": [
        "Along",
        "Anini",
        "Anjaw",
        "Bameng",
        "Basar",
        "Changlang",
        "Chowkhem",
        "Daporizo",
        "Dibang Valley",
        "Dirang",
        "Hayuliang",
        "Huri",
        "Itanagar",
        "Jairampur",
        "Kalaktung",
        "Kameng",
        "Khonsa",
        "Kolaring",
        "Kurung Kumey",
        "Lohit",
        "Lower Dibang Valley",
        "Lower Subansiri",
        "Mariyang",
        "Mechuka",
        "Miao",
        "Nefra",
        "Pakkekesang",
        "Pangin",
        "Papum Pare",
        "Passighat",
        "Roing",
        "Sagalee",
        "Seppa",
        "Siang",
        "Tali",
        "Taliha",
        "Tawang",
        "Tezu",
        "Tirap",
        "Tuting",
        "Upper Siang",
        "Upper Subansiri",
        "Yiang Kiag"
    ],
    "Assam": [
        "Abhayapuri",
        "Baithalangshu",
        "Barama",
        "Barpeta Road",
        "Bihupuria",
        "Bijni",
        "Bilasipara",
        "Bokajan",
        "Bokakhat",
        "Boko",
        "Bongaigaon",
        "Cachar",
        "Cachar Hills",
        "Darrang",
        "Dhakuakhana",
        "Dhemaji",
        "Dhubri",
        "Dibrugarh",
        "Digboi",
        "Diphu",
        "Goalpara",
        "Gohpur",
        "Golaghat",
        "Guwahati",
        "Hailakandi",
        "Hajo",
        "Halflong",
        "Hojai",
        "Howraghat",
        "Jorhat",
        "Kamrup",
        "Karbi Anglong",
        "Karimganj",
        "Kokarajhar",
        "Kokrajhar",
        "Lakhimpur",
        "Maibong",
        "Majuli",
        "Mangaldoi",
        "Mariani",
        "Marigaon",
        "Moranhat",
        "Morigaon",
        "Nagaon",
        "Nalbari",
        "Rangapara",
        "Sadiya",
        "Sibsagar",
        "Silchar",
        "Sivasagar",
        "Sonitpur",
        "Tarabarihat",
        "Tezpur",
        "Tinsukia",
        "Udalgiri",
        "Udalguri",
        "UdarbondhBarpeta"
    ],
    "Bihar": [
        "Adhaura",
        "Amarpur",
        "Araria",
        "Areraj",
        "Arrah",
        "Arwal",
        "Aurangabad",
        "Bagaha",
        "Banka",
        "Banmankhi",
        "Barachakia",
        "Barauni",
        "Barh",
        "Barosi",
        "Begusarai",
        "Benipatti",
        "Benipur",
        "Bettiah",
        "Bhabhua",
        "Bhagalpur",
        "Bhojpur",
        "Bidupur",
        "Biharsharif",
        "Bikram",
        "Bikramganj",
        "Birpur",
        "Buxar",
        "Chakai",
        "Champaran",
        "Chapara",
        "Dalsinghsarai",
        "Danapur",
        "Darbhanga",
        "Daudnagar",
        "Dhaka",
        "Dhamdaha",
        "Dumraon",
        "Ekma",
        "Forbesganj",
        "Gaya",
        "Gogri",
        "Gopalganj",
        "H.Kharagpur",
        "Hajipur",
        "Hathua",
        "Hilsa",
        "Imamganj",
        "Jahanabad",
        "Jainagar",
        "Jamshedpur",
        "Jamui",
        "Jehanabad",
        "Jhajha",
        "Jhanjharpur",
        "Kahalgaon",
        "Kaimur (Bhabua)",
        "Katihar",
        "Katoria",
        "Khagaria",
        "Kishanganj",
        "Korha",
        "Lakhisarai",
        "Madhepura",
        "Madhubani",
        "Maharajganj",
        "Mahua",
        "Mairwa",
        "Mallehpur",
        "Masrakh",
        "Mohania",
        "Monghyr",
        "Motihari",
        "Motipur",
        "Munger",
        "Muzaffarpur",
        "Nabinagar",
        "Nalanda",
        "Narkatiaganj",
        "Naugachia",
        "Nawada",
        "Pakribarwan",
        "Pakridayal",
        "Patna",
        "Phulparas",
        "Piro",
        "Pupri",
        "Purena",
        "Purnia",
        "Rafiganj",
        "Rajauli",
        "Ramnagar",
        "Raniganj",
        "Raxaul",
        "Rohtas",
        "Rosera",
        "S.Bakhtiarpur",
        "Saharsa",
        "Samastipur",
        "Saran",
        "Sasaram",
        "Seikhpura",
        "Sheikhpura",
        "Sheohar",
        "Sherghati",
        "Sidhawalia",
        "Singhwara",
        "Sitamarhi",
        "Siwan",
        "Sonepur",
        "Supaul",
        "Thakurganj",
        "Triveniganj",
        "Udakishanganj",
        "Vaishali",
        "Wazirganj"
    ],
    "Chandigarh": [
        "Chandigarh",
        "Mani Marja"
    ],
    "Chhattisgarh": [
        "Ambikapur",
        "Antagarh",
        "Arang",
        "Bacheli",
        "Bagbahera",
        "Bagicha",
        "Baikunthpur",
        "Balod",
        "Balodabazar",
        "Balrampur",
        "Barpalli",
        "Basana",
        "Bastanar",
        "Bastar",
        "Bderajpur",
        "Bemetara",
        "Berla",
        "Bhairongarh",
        "Bhanupratappur",
        "Bharathpur",
        "Bhatapara",
        "Bhilai",
        "Bhilaigarh",
        "Bhopalpatnam",
        "Bijapur",
        "Bilaspur",
        "Bodla",
        "Bokaband",
        "Chandipara",
        "Chhinagarh",
        "Chhuriakala",
        "Chingmut",
        "Chuikhadan",
        "Dabhara",
        "Dallirajhara",
        "Dantewada",
        "Deobhog",
        "Dhamda",
        "Dhamtari",
        "Dharamjaigarh",
        "Dongargarh",
        "Durg",
        "Durgakondal",
        "Fingeshwar",
        "Gariaband",
        "Garpa",
        "Gharghoda",
        "Gogunda",
        "Ilamidi",
        "Jagdalpur",
        "Janjgir",
        "Janjgir-Champa",
        "Jarwa",
        "Jashpur",
        "Jashpurnagar",
        "Kabirdham-Kawardha",
        "Kanker",
        "Kasdol",
        "Kathdol",
        "Kathghora",
        "Kawardha",
        "Keskal",
        "Khairgarh",
        "Kondagaon",
        "Konta",
        "Korba",
        "Korea",
        "Kota",
        "Koyelibeda",
        "Kuakunda",
        "Kunkuri",
        "Kurud",
        "Lohadigundah",
        "Lormi",
        "Luckwada",
        "Mahasamund",
        "Makodi",
        "Manendragarh",
        "Manpur",
        "Marwahi",
        "Mohla",
        "Mungeli",
        "Nagri",
        "Narainpur",
        "Narayanpur",
        "Neora",
        "Netanar",
        "Odgi",
        "Padamkot",
        "Pakhanjur",
        "Pali",
        "Pandaria",
        "Pandishankar",
        "Parasgaon",
        "Pasan",
        "Patan",
        "Pathalgaon",
        "Pendra",
        "Pratappur",
        "Premnagar",
        "Raigarh",
        "Raipur",
        "Rajnandgaon",
        "Rajpur",
        "Ramchandrapur",
        "Saraipali",
        "Saranggarh",
        "Sarona",
        "Semaria",
        "Shakti",
        "Sitapur",
        "Sukma",
        "Surajpur",
        "Surguja",
        "Tapkara",
        "Toynar",
        "Udaipur",
        "Uproda",
        "Wadrainagar"
    ],
    "Dadra and Nagar Haveli and Daman and Diu": [
        "Amal",
        "Amli",
        "Bedpa",
        "Brancavare",
        "Chikhli",
        "Dadra & Nagar Haveli",
        "Dagasi",
        "Dahikhed",
        "Daman",
        "Diu",
        "Dolara",
        "Galonda",
        "Kanadi",
        "Karchond",
        "Khadoli",
        "Kharadpada",
        "Kherabari",
        "Kherdi",
        "Kothar",
        "Luari",
        "Magarvara",
        "Mashat",
        "Nagwa",
        "Pariali",
        "Passo Covo",
        "Rakholi",
        "Rudana",
        "Saili",
        "Sili",
        "Silvassa",
        "Sindavni",
        "Udva",
        "Umbarkoi",
        "Vansda",
        "Vasona",
        "Velugam"
    ],
    "Delhi": [
        "New Delhi",
        "Old Delhi",
        "Central Delhi",
        "East Delhi",
        "North Delhi",
        "North East Delhi",
        "North West Delhi",
        "South Delhi",
        "South West Delhi",
        "West Delhi"
    ],
    "Goa": [
        "Canacona",
        "Candolim",
        "Chinchinim",
        "Cortalim",
        "Goa",
        "Jua",
        "Madgaon",
        "Mahem",
        "Mapuca",
        "Marmagao",
        "Panji",
        "Ponda",
        "Sanvordem",
        "Terekhol"
    ],
    "Gujarat": [
        "Ahmedabad",
        "Ahwa",
        "Amod",
        "Amreli",
        "Anand",
        "Anjar",
        "Ankaleshwar",
        "Babra",
        "Balasinor",
        "Banaskantha",
        "Bansada",
        "Bardoli",
        "Bareja",
        "Baroda",
        "Barwala",
        "Bayad",
        "Bhachav",
        "Bhanvad",
        "Bharuch",
        "Bhavnagar",
        "Bhiloda",
        "Bhuj",
        "Billimora",
        "Borsad",
        "Botad",
        "Chanasma",
        "Chhota Udaipur",
        "Chotila",
        "Dabhoi",
        "Dahod",
        "Damnagar",
        "Dang",
        "Danta",
        "Dasada",
        "Dediapada",
        "Deesa",
        "Dehgam",
        "Deodar",
        "Devgadhbaria",
        "Dhandhuka",
        "Dhanera",
        "Dharampur",
        "Dhari",
        "Dholka",
        "Dhoraji",
        "Dhrangadhra",
        "Dhrol",
        "Dwarka",
        "Fortsongadh",
        "Gadhada",
        "Gandhi Nagar",
        "Gariadhar",
        "Godhra",
        "Gogodar",
        "Gondal",
        "Halol",
        "Halvad",
        "Harij",
        "Himatnagar",
        "Idar",
        "Jambusar",
        "Jamjodhpur",
        "Jamkalyanpur",
        "Jamnagar",
        "Jasdan",
        "Jetpur",
        "Jhagadia",
        "Jhalod",
        "Jodia",
        "Junagadh",
        "Junagarh",
        "Kalawad",
        "Kalol",
        "Kapad Wanj",
        "Keshod",
        "Khambat",
        "Khambhalia",
        "Khavda",
        "Kheda",
        "Khedbrahma",
        "Kheralu",
        "Kodinar",
        "Kotdasanghani",
        "Kunkawav",
        "Kutch",
        "Kutchmandvi",
        "Kutiyana",
        "Lakhpat",
        "Lakhtar",
        "Lalpur",
        "Limbdi",
        "Limkheda",
        "Lunavada",
        "M.M.Mangrol",
        "Mahuva",
        "Malia-Hatina",
        "Maliya",
        "Malpur",
        "Manavadar",
        "Mandvi",
        "Mangrol",
        "Mehmedabad",
        "Mehsana",
        "Miyagam",
        "Modasa",
        "Morvi",
        "Muli",
        "Mundra",
        "Nadiad",
        "Nakhatrana",
        "Nalia",
        "Narmada",
        "Naswadi",
        "Navasari",
        "Nizar",
        "Okha",
        "Paddhari",
        "Padra",
        "Palanpur",
        "Palitana",
        "Panchmahals",
        "Patan",
        "Pavijetpur",
        "Porbandar",
        "Prantij",
        "Radhanpur",
        "Rahpar",
        "Rajaula",
        "Rajkot",
        "Rajpipla",
        "Ranavav",
        "Sabarkantha",
        "Sanand",
        "Sankheda",
        "Santalpur",
        "Santrampur",
        "Savarkundla",
        "Savli",
        "Sayan",
        "Sayla",
        "Shehra",
        "Sidhpur",
        "Sihor",
        "Sojitra",
        "Sumrasar",
        "Surat",
        "Surendranagar",
        "Talaja",
        "Thara",
        "Tharad",
        "Thasra",
        "Una-Diu",
        "Upleta",
        "Vadgam",
        "Vadodara",
        "Valia",
        "Vallabhipur",
        "Valod",
        "Valsad",
        "Vanthali",
        "Vapi",
        "Vav",
        "Veraval",
        "Vijapur",
        "Viramgam",
        "Visavadar",
        "Visnagar",
        "Vyara",
        "Waghodia",
        "Wankaner"
    ],
    "Haryana": [
        "Adampur Mandi",
        "Ambala",
        "Assandh",
        "Bahadurgarh",
        "Barara",
        "Barwala",
        "Bawal",
        "Bawanikhera",
        "Bhiwani",
        "Charkhidadri",
        "Cheeka",
        "Chhachrauli",
        "Dabwali",
        "Ellenabad",
        "Faridabad",
        "Fatehabad",
        "Ferojpur Jhirka",
        "Gharaunda",
        "Gohana",
        "Gurgaon",
        "Hansi",
        "Hisar",
        "Jagadhari",
        "Jatusana",
        "Jhajjar",
        "Jind",
        "Julana",
        "Kaithal",
        "Kalanaur",
        "Kalanwali",
        "Kalka",
        "Karnal",
        "Kosli",
        "Kurukshetra",
        "Loharu",
        "Mahendragarh",
        "Meham",
        "Mewat",
        "Mohindergarh",
        "Naraingarh",
        "Narnaul",
        "Narwana",
        "Nilokheri",
        "Nuh",
        "Palwal",
        "Panchkula",
        "Panipat",
        "Pehowa",
        "Ratia",
        "Rewari",
        "Rohtak",
        "Safidon",
        "Sirsa",
        "Siwani",
        "Sonipat",
        "Tohana",
        "Tohsam",
        "Yamunanagar"
    ],
    "Himachal Pradesh": [
        "Amb",
        "Arki",
        "Banjar",
        "Bharmour",
        "Bilaspur",
        "Chamba",
        "Churah",
        "Dalhousie",
        "Dehra Gopipur",
        "Hamirpur",
        "Jogindernagar",
        "Kalpa",
        "Kangra",
        "Kinnaur",
        "Kullu",
        "Lahaul",
        "Mandi",
        "Nahan",
        "Nalagarh",
        "Nirmand",
        "Nurpur",
        "Palampur",
        "Pangi",
        "Paonta",
        "Pooh",
        "Rajgarh",
        "Rampur Bushahar",
        "Rohru",
        "Shimla",
        "Sirmaur",
        "Solan",
        "Spiti",
        "Sundernagar",
        "Theog",
        "Udaipur",
        "Una"
    ],
    "Jammu and Kashmir": [
        "Akhnoor",
        "Anantnag",
        "Badgam",
        "Bandipur",
        "Baramulla",
        "Basholi",
        "Bedarwah",
        "Budgam",
        "Doda",
        "Gulmarg",
        "Jammu",
        "Kalakot",
        "Kargil",
        "Karnah",
        "Kathua",
        "Kishtwar",
        "Kulgam",
        "Kupwara",
        "Leh",
        "Mahore",
        "Nagrota",
        "Nobra",
        "Nowshera",
        "Nyoma",
        "Padam",
        "Pahalgam",
        "Patnitop",
        "Poonch",
        "Pulwama",
        "Rajouri",
        "Ramban",
        "Ramnagar",
        "Reasi",
        "Samba",
        "Srinagar",
        "Udhampur",
        "Vaishno Devi"
    ],
    "Jharkhand": [
        "Bagodar",
        "Baharagora",
        "Balumath",
        "Barhi",
        "Barkagaon",
        "Barwadih",
        "Basia",
        "Bermo",
        "Bhandaria",
        "Bhawanathpur",
        "Bishrampur",
        "Bokaro",
        "Bolwa",
        "Bundu",
        "Chaibasa",
        "Chainpur",
        "Chakardharpur",
        "Chandil",
        "Chatra",
        "Chavparan",
        "Daltonganj",
        "Deoghar",
        "Dhanbad",
        "Dumka",
        "Dumri",
        "Garhwa",
        "Garu",
        "Ghaghra",
        "Ghatsila",
        "Giridih",
        "Godda",
        "Gomia",
        "Govindpur",
        "Gumla",
        "Hazaribagh",
        "Hunterganj",
        "Ichak",
        "Itki",
        "Jagarnathpur",
        "Jamshedpur",
        "Jamtara",
        "Japla",
        "Jharmundi",
        "Jhinkpani",
        "Jhumaritalaiya",
        "Kathikund",
        "Kharsawa",
        "Khunti",
        "Koderma",
        "Kolebira",
        "Latehar",
        "Lohardaga",
        "Madhupur",
        "Mahagama",
        "Maheshpur Raj",
        "Mandar",
        "Mandu",
        "Manoharpur",
        "Muri",
        "Nagarutatri",
        "Nala",
        "Noamundi",
        "Pakur",
        "Palamu",
        "Palkot",
        "Patan",
        "Rajdhanwar",
        "Rajmahal",
        "Ramgarh",
        "Ranchi",
        "Sahibganj",
        "Saraikela",
        "Simaria",
        "Simdega",
        "Singhbhum",
        "Tisri",
        "Torpa"
    ],
    "Karnataka": [
        "Afzalpur",
        "Ainapur",
        "Aland",
        "Alur",
        "Anekal",
        "Ankola",
        "Arsikere",
        "Athani",
        "Aurad",
        "Bableshwar",
        "Badami",
        "Bagalkot",
        "Bagepalli",
        "Bailhongal",
        "Bangalore",
        "Bangalore Rural",
        "Bangarpet",
        "Bantwal",
        "Basavakalyan",
        "Basavanabagewadi",
        "Basavapatna",
        "Belgaum",
        "Bellary",
        "Belthangady",
        "Belur",
        "Bhadravati",
        "Bhalki",
        "Bhatkal",
        "Bidar",
        "Bijapur",
        "Biligi",
        "Chadchan",
        "Challakere",
        "Chamrajnagar",
        "Channagiri",
        "Channapatna",
        "Channarayapatna",
        "Chickmagalur",
        "Chikballapur",
        "Chikkaballapur",
        "Chikkanayakanahalli",
        "Chikkodi",
        "Chikmagalur",
        "Chincholi",
        "Chintamani",
        "Chitradurga",
        "Chittapur",
        "Cowdahalli",
        "Davanagere",
        "Deodurga",
        "Devangere",
        "Devarahippargi",
        "Dharwad",
        "Doddaballapur",
        "Gadag",
        "Gangavathi",
        "Gokak",
        "Gowribdanpur",
        "Gubbi",
        "Gulbarga",
        "Gundlupet",
        "H.B.Halli",
        "H.D. Kote",
        "Haliyal",
        "Hampi",
        "Hangal",
        "Harapanahalli",
        "Hassan",
        "Haveri",
        "Hebri",
        "Hirekerur",
        "Hiriyur",
        "Holalkere",
        "Holenarsipur",
        "Honnali",
        "Honnavar",
        "Hosadurga",
        "Hosakote",
        "Hosanagara",
        "Hospet",
        "Hubli",
        "Hukkeri",
        "Humnabad",
        "Hungund",
        "Hunsagi",
        "Hunsur",
        "Huvinahadagali",
        "Indi",
        "Jagalur",
        "Jamkhandi",
        "Jewargi",
        "Joida",
        "K.R. Nagar",
        "Kadur",
        "Kalghatagi",
        "Kamalapur",
        "Kanakapura",
        "Kannada",
        "Kargal",
        "Karkala",
        "Karwar",
        "Khanapur",
        "Kodagu",
        "Kolar",
        "Kollegal",
        "Koppa",
        "Koppal",
        "Koratageri",
        "Krishnarajapet",
        "Kudligi",
        "Kumta",
        "Kundapur",
        "Kundgol",
        "Kunigal",
        "Kurugodu",
        "Kustagi",
        "Lingsugur",
        "Madikeri",
        "Madugiri",
        "Malavalli",
        "Malur",
        "Mandya",
        "Mangalore",
        "Manipal",
        "Manvi",
        "Mashal",
        "Molkalmuru",
        "Mudalgi",
        "Muddebihal",
        "Mudhol",
        "Mudigere",
        "Mulbagal",
        "Mundagod",
        "Mundargi",
        "Murugod",
        "Mysore",
        "Nagamangala",
        "Nanjangud",
        "Nargund",
        "Narsimrajapur",
        "Navalgund",
        "Nelamangala",
        "Nimburga",
        "Pandavapura",
        "Pavagada",
        "Puttur",
        "Raibag",
        "Raichur",
        "Ramdurg",
        "Ranebennur",
        "Ron",
        "Sagar",
        "Sakleshpur",
        "Salkani",
        "Sandur",
        "Saundatti",
        "Savanur",
        "Sedam",
        "Shahapur",
        "Shankarnarayana",
        "Shikaripura",
        "Shimoga",
        "Shirahatti",
        "Shorapur",
        "Siddapur",
        "Sidlaghatta",
        "Sindagi",
        "Sindhanur",
        "Sira",
        "Sirsi",
        "Siruguppa",
        "Somwarpet",
        "Sorab",
        "Sringeri",
        "Sriniwaspur",
        "Srirangapatna",
        "Sullia",
        "T. Narsipur",
        "Tallak",
        "Tarikere",
        "Telgi",
        "Thirthahalli",
        "Tiptur",
        "Tumkur",
        "Turuvekere",
        "Udupi",
        "Virajpet",
        "Wadi",
        "Yadgiri",
        "Yelburga",
        "Yellapur"
    ],
    "Kerala": [
        "Adimaly",
        "Adoor",
        "Agathy",
        "Alappuzha",
        "Alathur",
        "Alleppey",
        "Alwaye",
        "Amini",
        "Androth",
        "Attingal",
        "Badagara",
        "Bitra",
        "Calicut",
        "Cannanore",
        "Chetlet",
        "Ernakulam",
        "Idukki",
        "Irinjalakuda",
        "Kadamath",
        "Kalpeni",
        "Kalpetta",
        "Kanhangad",
        "Kanjirapally",
        "Kannur",
        "Karungapally",
        "Kasargode",
        "Kavarathy",
        "Kiltan",
        "Kochi",
        "Koduvayur",
        "Kollam",
        "Kottayam",
        "Kovalam",
        "Kozhikode",
        "Kunnamkulam",
        "Malappuram",
        "Mananthodi",
        "Manjeri",
        "Mannarghat",
        "Mavelikkara",
        "Minicoy",
        "Munnar",
        "Muvattupuzha",
        "Nedumandad",
        "Nedumgandam",
        "Nilambur",
        "Palai",
        "Palakkad",
        "Palghat",
        "Pathaanamthitta",
        "Pathanamthitta",
        "Payyanur",
        "Peermedu",
        "Perinthalmanna",
        "Perumbavoor",
        "Punalur",
        "Quilon",
        "Ranni",
        "Shertallai",
        "Shoranur",
        "Taliparamba",
        "Tellicherry",
        "Thiruvananthapuram",
        "Thodupuzha",
        "Thrissur",
        "Tirur",
        "Tiruvalla",
        "Trichur",
        "Trivandrum",
        "Uppala",
        "Vadakkanchery",
        "Vikom",
        "Wayanad"
    ],
    "Lakshadweep": [
        "Agatti Island",
        "Bingaram Island",
        "Bitra Island",
        "Chetlat Island",
        "Kadmat Island",
        "Kalpeni Island",
        "Kavaratti Island",
        "Kiltan Island",
        "Lakshadweep Sea",
        "Minicoy Island",
        "North Island",
        "South Island"
    ],
    "Madhya Pradesh": [
        "Agar",
        "Ajaigarh",
        "Alirajpur",
        "Amarpatan",
        "Amarwada",
        "Ambah",
        "Anuppur",
        "Arone",
        "Ashoknagar",
        "Ashta",
        "Atner",
        "Babaichichli",
        "Badamalhera",
        "Badarwsas",
        "Badnagar",
        "Badnawar",
        "Badwani",
        "Bagli",
        "Baihar",
        "Balaghat",
        "Baldeogarh",
        "Baldi",
        "Bamori",
        "Banda",
        "Bandhavgarh",
        "Bareli",
        "Baroda",
        "Barwaha",
        "Barwani",
        "Batkakhapa",
        "Begamganj",
        "Beohari",
        "Berasia",
        "Berchha",
        "Betul",
        "Bhainsdehi",
        "Bhander",
        "Bhanpura",
        "Bhikangaon",
        "Bhimpur",
        "Bhind",
        "Bhitarwar",
        "Bhopal",
        "Biaora",
        "Bijadandi",
        "Bijawar",
        "Bijaypur",
        "Bina",
        "Birsa",
        "Birsinghpur",
        "Budhni",
        "Burhanpur",
        "Buxwaha",
        "Chachaura",
        "Chanderi",
        "Chaurai",
        "Chhapara",
        "Chhatarpur",
        "Chhindwara",
        "Chicholi",
        "Chitrangi",
        "Churhat",
        "Dabra",
        "Damoh",
        "Datia",
        "Deori",
        "Deosar",
        "Depalpur",
        "Dewas",
        "Dhar",
        "Dharampuri",
        "Dindori",
        "Gadarwara",
        "Gairatganj",
        "Ganjbasoda",
        "Garoth",
        "Ghansour",
        "Ghatia",
        "Ghatigaon",
        "Ghorandogri",
        "Ghughari",
        "Gogaon",
        "Gohad",
        "Goharganj",
        "Gopalganj",
        "Gotegaon",
        "Gourihar",
        "Guna",
        "Gunnore",
        "Gwalior",
        "Gyraspur",
        "Hanumana",
        "Harda",
        "Harrai",
        "Harsud",
        "Hatta",
        "Hoshangabad",
        "Ichhawar",
        "Indore",
        "Isagarh",
        "Itarsi",
        "Jabalpur",
        "Jabera",
        "Jagdalpur",
        "Jaisinghnagar",
        "Jaithari",
        "Jaitpur",
        "Jaitwara",
        "Jamai",
        "Jaora",
        "Jatara",
        "Jawad",
        "Jhabua",
        "Jobat",
        "Jora",
        "Kakaiya",
        "Kannod",
        "Kannodi",
        "Karanjia",
        "Kareli",
        "Karera",
        "Karhal",
        "Karpa",
        "Kasrawad",
        "Katangi",
        "Katni",
        "Keolari",
        "Khachrod",
        "Khajuraho",
        "Khakner",
        "Khalwa",
        "Khandwa",
        "Khaniadhana",
        "Khargone",
        "Khategaon",
        "Khetia",
        "Khilchipur",
        "Khirkiya",
        "Khurai",
        "Kolaras",
        "Kotma",
        "Kukshi",
        "Kundam",
        "Kurwai",
        "Kusmi",
        "Laher",
        "Lakhnadon",
        "Lamta",
        "Lanji",
        "Lateri",
        "Laundi",
        "Maheshwar",
        "Mahidpurcity",
        "Maihar",
        "Majhagwan",
        "Majholi",
        "Malhargarh",
        "Manasa",
        "Manawar",
        "Mandla",
        "Mandsaur",
        "Manpur",
        "Mauganj",
        "Mawai",
        "Mehgaon",
        "Mhow",
        "Morena",
        "Multai",
        "Mungaoli",
        "Nagod",
        "Nainpur",
        "Narsingarh",
        "Narsinghpur",
        "Narwar",
        "Nasrullaganj",
        "Nateran",
        "Neemuch",
        "Niwari",
        "Niwas",
        "Nowgaon",
        "Pachmarhi",
        "Pandhana",
        "Pandhurna",
        "Panna",
        "Parasia",
        "Patan",
        "Patera",
        "Patharia",
        "Pawai",
        "Petlawad",
        "Pichhore",
        "Piparia",
        "Pohari",
        "Prabhapattan",
        "Punasa",
        "Pushprajgarh",
        "Raghogarh",
        "Raghunathpur",
        "Rahatgarh",
        "Raisen",
        "Rajgarh",
        "Rajpur",
        "Ratlam",
        "Rehli",
        "Rewa",
        "Sabalgarh",
        "Sagar",
        "Sailana",
        "Sanwer",
        "Sarangpur",
        "Sardarpur",
        "Satna",
        "Saunsar",
        "Sehore",
        "Sendhwa",
        "Seondha",
        "Seoni",
        "Seonimalwa",
        "Shahdol",
        "Shahnagar",
        "Shahpur",
        "Shajapur",
        "Sheopur",
        "Sheopurkalan",
        "Shivpuri",
        "Shujalpur",
        "Sidhi",
        "Sihora",
        "Silwani",
        "Singrauli",
        "Sirmour",
        "Sironj",
        "Sitamau",
        "Sohagpur",
        "Sondhwa",
        "Sonkatch",
        "Susner",
        "Tamia",
        "Tarana",
        "Tendukheda",
        "Teonthar",
        "Thandla",
        "Tikamgarh",
        "Timarani",
        "Udaipura",
        "Ujjain",
        "Umaria",
        "Umariapan",
        "Vidisha",
        "Vijayraghogarh",
        "Waraseoni",
        "Zhirnia"
    ],
    "Maharashtra": [
        "Achalpur",
        "Aheri",
        "Ahmednagar",
        "Ahmedpur",
        "Ajara",
        "Akkalkot",
        "Akola",
        "Akole",
        "Akot",
        "Alibagh",
        "Amagaon",
        "Amalner",
        "Ambad",
        "Ambejogai",
        "Amravati",
        "Arjuni Merogaon",
        "Arvi",
        "Ashti",
        "Atpadi",
        "Aurangabad",
        "Ausa",
        "Babhulgaon",
        "Balapur",
        "Baramati",
        "Barshi Takli",
        "Barsi",
        "Basmatnagar",
        "Bassein",
        "Beed",
        "Bhadrawati",
        "Bhamregadh",
        "Bhandara",
        "Bhir",
        "Bhiwandi",
        "Bhiwapur",
        "Bhokar",
        "Bhokardan",
        "Bhoom",
        "Bhor",
        "Bhudargad",
        "Bhusawal",
        "Billoli",
        "Brahmapuri",
        "Buldhana",
        "Butibori",
        "Chalisgaon",
        "Chamorshi",
        "Chandgad",
        "Chandrapur",
        "Chandur",
        "Chanwad",
        "Chhikaldara",
        "Chikhali",
        "Chinchwad",
        "Chiplun",
        "Chopda",
        "Chumur",
        "Dahanu",
        "Dapoli",
        "Darwaha",
        "Daryapur",
        "Daund",
        "Degloor",
        "Delhi Tanda",
        "Deogad",
        "Deolgaonraja",
        "Deori",
        "Desaiganj",
        "Dhadgaon",
        "Dhanora",
        "Dharani",
        "Dhiwadi",
        "Dhule",
        "Dhulia",
        "Digras",
        "Dindori",
        "Edalabad",
        "Erandul",
        "Etapalli",
        "Gadhchiroli",
        "Gadhinglaj",
        "Gaganbavada",
        "Gangakhed",
        "Gangapur",
        "Gevrai",
        "Ghatanji",
        "Golegaon",
        "Gondia",
        "Gondpipri",
        "Goregaon",
        "Guhagar",
        "Hadgaon",
        "Hatkangale",
        "Hinganghat",
        "Hingoli",
        "Hingua",
        "Igatpuri",
        "Indapur",
        "Islampur",
        "Jalgaon",
        "Jalna",
        "Jamkhed",
        "Jamner",
        "Jath",
        "Jawahar",
        "Jintdor",
        "Junnar",
        "Kagal",
        "Kaij",
        "Kalamb",
        "Kalamnuri",
        "Kallam",
        "Kalmeshwar",
        "Kalwan",
        "Kalyan",
        "Kamptee",
        "Kandhar",
        "Kankavali",
        "Kannad",
        "Karad",
        "Karjat",
        "Karmala",
        "Katol",
        "Kavathemankal",
        "Kedgaon",
        "Khadakwasala",
        "Khamgaon",
        "Khed",
        "Khopoli",
        "Khultabad",
        "Kinwat",
        "Kolhapur",
        "Kopargaon",
        "Koregaon",
        "Kudal",
        "Kuhi",
        "Kurkheda",
        "Kusumba",
        "Lakhandur",
        "Langa",
        "Latur",
        "Lonar",
        "Lonavala",
        "Madangad",
        "Madha",
        "Mahabaleshwar",
        "Mahad",
        "Mahagaon",
        "Mahasala",
        "Mahaswad",
        "Malegaon",
        "Malgaon",
        "Malgund",
        "Malkapur",
        "Malsuras",
        "Malwan",
        "Mancher",
        "Mangalwedha",
        "Mangaon",
        "Mangrulpur",
        "Manjalegaon",
        "Manmad",
        "Maregaon",
        "Mehda",
        "Mekhar",
        "Mohadi",
        "Mohol",
        "Mokhada",
        "Morshi",
        "Mouda",
        "Mukhed",
        "Mul",
        "Mumbai",
        "Murbad",
        "Murtizapur",
        "Murud",
        "Nagbhir",
        "Nagpur",
        "Nahavara",
        "Nanded",
        "Nandgaon",
        "Nandnva",
        "Nandurbar",
        "Narkhed",
        "Nashik",
        "Navapur",
        "Ner",
        "Newasa",
        "Nilanga",
        "Niphad",
        "Omerga",
        "Osmanabad",
        "Pachora",
        "Paithan",
        "Palghar",
        "Pali",
        "Pandharkawada",
        "Pandharpur",
        "Panhala",
        "Paranda",
        "Parbhani",
        "Parner",
        "Parola",
        "Parseoni",
        "Partur",
        "Patan",
        "Pathardi",
        "Pathari",
        "Patoda",
        "Pauni",
        "Peint",
        "Pen",
        "Phaltan",
        "Pimpalner",
        "Pirangut",
        "Poladpur",
        "Pune",
        "Pusad",
        "Pusegaon",
        "Radhanagar",
        "Rahuri",
        "Raigad",
        "Rajapur",
        "Rajgurunagar",
        "Rajura",
        "Ralegaon",
        "Ramtek",
        "Ratnagiri",
        "Raver",
        "Risod",
        "Roha",
        "Sakarwadi",
        "Sakoli",
        "Sakri",
        "Salekasa",
        "Samudrapur",
        "Sangamner",
        "Sanganeshwar",
        "Sangli",
        "Sangola",
        "Sanguem",
        "Saoner",
        "Saswad",
        "Satana",
        "Satara",
        "Sawantwadi",
        "Seloo",
        "Shahada",
        "Shahapur",
        "Shahuwadi",
        "Shevgaon",
        "Shirala",
        "Shirol",
        "Shirpur",
        "Shirur",
        "Shirwal",
        "Sholapur",
        "Shri Rampur",
        "Shrigonda",
        "Shrivardhan",
        "Sillod",
        "Sinderwahi",
        "Sindhudurg",
        "Sindkheda",
        "Sindkhedaraja",
        "Sinnar",
        "Sironcha",
        "Soyegaon",
        "Surgena",
        "Talasari",
        "Talegaon S.Ji Pant",
        "Taloda",
        "Tasgaon",
        "Thane",
        "Tirora",
        "Tiwasa",
        "Trimbak",
        "Tuljapur",
        "Tumsar",
        "Udgir",
        "Umarkhed",
        "Umrane",
        "Umrer",
        "Urlikanchan",
        "Vaduj",
        "Velhe",
        "Vengurla",
        "Vijapur",
        "Vita",
        "Wada",
        "Wai",
        "Walchandnagar",
        "Wani",
        "Wardha",
        "Warlydwarud",
        "Warora",
        "Washim",
        "Wathar",
        "Yavatmal",
        "Yawal",
        "Yeola",
        "Yeotmal"
    ],
    "Manipur": [
        "Bishnupur",
        "Chakpikarong",
        "Chandel",
        "Chattrik",
        "Churachandpur",
        "Imphal",
        "Jiribam",
        "Kakching",
        "Kalapahar",
        "Mao",
        "Mulam",
        "Parbung",
        "Sadarhills",
        "Saibom",
        "Sempang",
        "Senapati",
        "Sochumer",
        "Taloulong",
        "Tamenglong",
        "Thinghat",
        "Thoubal",
        "Ukhrul"
    ],
    "Meghalaya": [
        "Amlaren",
        "Baghmara",
        "Cherrapunjee",
        "Dadengiri",
        "Garo Hills",
        "Jaintia Hills",
        "Jowai",
        "Khasi Hills",
        "Khliehriat",
        "Mariang",
        "Mawkyrwat",
        "Nongpoh",
        "Nongstoin",
        "Resubelpara",
        "Ri Bhoi",
        "Shillong",
        "Tura",
        "Williamnagar"
    ],
    "Mizoram": [
        "Aizawl",
        "Champhai",
        "Demagiri",
        "Kolasib",
        "Lawngtlai",
        "Lunglei",
        "Mamit",
        "Saiha",
        "Serchhip"
    ],
    "Nagaland": [
        "Dimapur",
        "Jalukie",
        "Kiphire",
        "Kohima",
        "Mokokchung",
        "Mon",
        "Phek",
        "Tuensang",
        "Wokha",
        "Zunheboto"
    ],
    "Odisha": [
        "Anandapur",
        "Angul",
        "Anugul",
        "Aska",
        "Athgarh",
        "Athmallik",
        "Attabira",
        "Bagdihi",
        "Balangir",
        "Balasore",
        "Baleswar",
        "Baliguda",
        "Balugaon",
        "Banaigarh",
        "Bangiriposi",
        "Barbil",
        "Bargarh",
        "Baripada",
        "Barkot",
        "Basta",
        "Berhampur",
        "Betanati",
        "Bhadrak",
        "Bhanjanagar",
        "Bhawanipatna",
        "Bhubaneswar",
        "Birmaharajpur",
        "Bisam Cuttack",
        "Boriguma",
        "Boudh",
        "Buguda",
        "Chandbali",
        "Chhatrapur",
        "Chhendipada",
        "Cuttack",
        "Daringbadi",
        "Daspalla",
        "Deodgarh",
        "Deogarh",
        "Dhanmandal",
        "Dharamgarh",
        "Dhenkanal",
        "Digapahandi",
        "Dunguripali",
        "G. Udayagiri",
        "Gajapati",
        "Ganjam",
        "Ghatgaon",
        "Gudari",
        "Gunupur",
        "Hemgiri",
        "Hindol",
        "Jagatsinghapur",
        "Jajpur",
        "Jamankira",
        "Jashipur",
        "Jayapatna",
        "Jeypur",
        "Jharigan",
        "Jharsuguda",
        "Jujumura",
        "Kalahandi",
        "Kalimela",
        "Kamakhyanagar",
        "Kandhamal",
        "Kantabhanji",
        "Kantamal",
        "Karanjia",
        "Kashipur",
        "Kendrapara",
        "Kendujhar",
        "Keonjhar",
        "Khalikote",
        "Khordha",
        "Khurda",
        "Komana",
        "Koraput",
        "Kotagarh",
        "Kuchinda",
        "Lahunipara",
        "Laxmipur",
        "M. Rampur",
        "Malkangiri",
        "Mathili",
        "Mayurbhanj",
        "Mohana",
        "Motu",
        "Nabarangapur",
        "Naktideul",
        "Nandapur",
        "Narlaroad",
        "Narsinghpur",
        "Nayagarh",
        "Nimapara",
        "Nowparatan",
        "Nowrangapur",
        "Nuapada",
        "Padampur",
        "Paikamal",
        "Palla Hara",
        "Papadhandi",
        "Parajang",
        "Pardip",
        "Parlakhemundi",
        "Patnagarh",
        "Pattamundai",
        "Phiringia",
        "Phulbani",
        "Puri",
        "Puruna Katak",
        "R. Udayigiri",
        "Rairakhol",
        "Rairangpur",
        "Rajgangpur",
        "Rajkhariar",
        "Rayagada",
        "Rourkela",
        "Sambalpur",
        "Sohela",
        "Sonapur",
        "Soro",
        "Subarnapur",
        "Sunabeda",
        "Sundergarh",
        "Surada",
        "T. Rampur",
        "Talcher",
        "Telkoi",
        "Titlagarh",
        "Tumudibandha",
        "Udala",
        "Umerkote"
    ],
    "Puducherry": [
        "Bahur",
        "Karaikal",
        "Mahe",
        "Pondicherry",
        "Purnankuppam",
        "Valudavur",
        "Villianur",
        "Yanam"
    ],
    "Punjab": [
        "Abohar",
        "Ajnala",
        "Amritsar",
        "Balachaur",
        "Barnala",
        "Batala",
        "Bathinda",
        "Chandigarh",
        "Dasua",
        "Dinanagar",
        "Faridkot",
        "Fatehgarh Sahib",
        "Fazilka",
        "Ferozepur",
        "Garhashanker",
        "Goindwal",
        "Gurdaspur",
        "Guruharsahai",
        "Hoshiarpur",
        "Jagraon",
        "Jalandhar",
        "Jugial",
        "Kapurthala",
        "Kharar",
        "Kotkapura",
        "Ludhiana",
        "Malaut",
        "Malerkotla",
        "Mansa",
        "Moga",
        "Muktasar",
        "Nabha",
        "Nakodar",
        "Nangal",
        "Nawanshahar",
        "Nawanshahr",
        "Pathankot",
        "Patiala",
        "Patti",
        "Phagwara",
        "Phillaur",
        "Phulmandi",
        "Quadian",
        "Rajpura",
        "Raman",
        "Rayya",
        "Ropar",
        "Rupnagar",
        "SAS Nagar",
        "Samana",
        "Samrala",
        "Sangrur",
        "Sardulgarh",
        "Sarhind",
        "Sultanpur Lodhi",
        "Sunam",
        "Tanda Urmar",
        "Tarn Taran",
        "Zira"
    ],
    "Rajasthan": [
        "Abu Road",
        "Ahore",
        "Ajmer",
        "Aklera",
        "Alwar",
        "Amber",
        "Amet",
        "Anupgarh",
        "Asind",
        "Aspur",
        "Atru",
        "Bagidora",
        "Bali",
        "Bamanwas",
        "Banera",
        "Bansur",
        "Banswara",
        "Baran",
        "Bari",
        "Barisadri",
        "Barmer",
        "Baseri",
        "Bassi",
        "Baswa",
        "Bayana",
        "Beawar",
        "Begun",
        "Behror",
        "Bhadra",
        "Bharatpur",
        "Bhilwara",
        "Bhim",
        "Bhinmal",
        "Bikaner",
        "Bilara",
        "Bundi",
        "Chhabra",
        "Chhipaborad",
        "Chirawa",
        "Chittorgarh",
        "Chohtan",
        "Churu",
        "Dantaramgarh",
        "Dausa",
        "Deedwana",
        "Deeg",
        "Degana",
        "Deogarh",
        "Deoli",
        "Desuri",
        "Dhariawad",
        "Dholpur",
        "Digod",
        "Dudu",
        "Dungarpur",
        "Dungla",
        "Fatehpur",
        "Gangapur",
        "Gangdhar",
        "Gerhi",
        "Ghatol",
        "Girwa",
        "Gogunda",
        "Hanumangarh",
        "Hindaun",
        "Hindoli",
        "Hurda",
        "Jahazpur",
        "Jaipur",
        "Jaisalmer",
        "Jalore",
        "Jhalawar",
        "Jhunjhunu",
        "Jodhpur",
        "Kaman",
        "Kapasan",
        "Karauli",
        "Kekri",
        "Keshoraipatan",
        "Khandar",
        "Kherwara",
        "Khetri",
        "Kishanganj",
        "Kishangarh",
        "Kishangarhbas",
        "Kolayat",
        "Kota",
        "Kotputli",
        "Kotra",
        "Kotri",
        "Kumbalgarh",
        "Kushalgarh",
        "Ladnun",
        "Ladpura",
        "Lalsot",
        "Laxmangarh",
        "Lunkaransar",
        "Mahuwa",
        "Malpura",
        "Malvi",
        "Mandal",
        "Mandalgarh",
        "Mandawar",
        "Mangrol",
        "Marwar-Jn",
        "Merta",
        "Nadbai",
        "Nagaur",
        "Nainwa",
        "Nasirabad",
        "Nathdwara",
        "Nawa",
        "Neem Ka Thana",
        "Newai",
        "Nimbahera",
        "Nohar",
        "Nokha",
        "Onli",
        "Osian",
        "Pachpadara",
        "Pachpahar",
        "Padampur",
        "Pali",
        "Parbatsar",
        "Phagi",
        "Phalodi",
        "Pilani",
        "Pindwara",
        "Pipalda",
        "Pirawa",
        "Pokaran",
        "Pratapgarh",
        "Raipur",
        "Raisinghnagar",
        "Rajgarh",
        "Rajsamand",
        "Ramganj Mandi",
        "Ramgarh",
        "Rashmi",
        "Ratangarh",
        "Reodar",
        "Rupbas",
        "Sadulshahar",
        "Sagwara",
        "Sahabad",
        "Salumber",
        "Sanchore",
        "Sangaria",
        "Sangod",
        "Sapotra",
        "Sarada",
        "Sardarshahar",
        "Sarwar",
        "Sawai Madhopur",
        "Shahapura",
        "Sheo",
        "Sheoganj",
        "Shergarh",
        "Sikar",
        "Sirohi",
        "Siwana",
        "Sojat",
        "Sri Dungargarh",
        "Sri Ganganagar",
        "Sri Karanpur",
        "Sri Madhopur",
        "Sujangarh",
        "Taranagar",
        "Thanaghazi",
        "Tibbi",
        "Tijara",
        "Todaraisingh",
        "Tonk",
        "Udaipur",
        "Udaipurwati",
        "Uniayara",
        "Vallabhnagar",
        "Viratnagar"
    ],
    "Sikkim": [
        "Barmiak",
        "Be",
        "Bhurtuk",
        "Chhubakha",
        "Chidam",
        "Chubha",
        "Chumikteng",
        "Dentam",
        "Dikchu",
        "Dzongri",
        "Gangtok",
        "Gauzing",
        "Gyalshing",
        "Hema",
        "Kerung",
        "Lachen",
        "Lachung",
        "Lema",
        "Lingtam",
        "Lungthu",
        "Mangan",
        "Namchi",
        "Namthang",
        "Nanga",
        "Nantang",
        "Naya Bazar",
        "Padamachen",
        "Pakhyong",
        "Pemayangtse",
        "Phensang",
        "Rangli",
        "Rinchingpong",
        "Sakyong",
        "Samdong",
        "Singtam",
        "Siniolchu",
        "Sombari",
        "Soreng",
        "Sosing",
        "Tekhug",
        "Temi",
        "Tsetang",
        "Tsomgo",
        "Tumlong",
        "Yangang",
        "Yumtang"
    ],
    "Tamil Nadu": [
        "Ambasamudram",
        "Anamali",
        "Arakandanallur",
        "Arantangi",
        "Aravakurichi",
        "Ariyalur",
        "Arkonam",
        "Arni",
        "Aruppukottai",
        "Attur",
        "Avanashi",
        "Batlagundu",
        "Bhavani",
        "Chengalpattu",
        "Chengam",
        "Chennai",
        "Chidambaram",
        "Chingleput",
        "Coimbatore",
        "Courtallam",
        "Cuddalore",
        "Cumbum",
        "Denkanikoitah",
        "Devakottai",
        "Dharampuram",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Gingee",
        "Gobichettipalayam",
        "Gudalur",
        "Gudiyatham",
        "Harur",
        "Hosur",
        "Jayamkondan",
        "Kallkurichi",
        "Kanchipuram",
        "Kangayam",
        "Kanyakumari",
        "Karaikal",
        "Karaikudi",
        "Karur",
        "Keeranur",
        "Kodaikanal",
        "Kodumudi",
        "Kotagiri",
        "Kovilpatti",
        "Krishnagiri",
        "Kulithalai",
        "Kumbakonam",
        "Kuzhithurai",
        "Madurai",
        "Madurantgam",
        "Manamadurai",
        "Manaparai",
        "Mannargudi",
        "Mayiladuthurai",
        "Mayiladutjurai",
        "Mettupalayam",
        "Metturdam",
        "Mudukulathur",
        "Mulanur",
        "Musiri",
        "Nagapattinam",
        "Nagarcoil",
        "Namakkal",
        "Nanguneri",
        "Natham",
        "Neyveli",
        "Nilgiris",
        "Oddanchatram",
        "Omalpur",
        "Ootacamund",
        "Ooty",
        "Orathanad",
        "Palacode",
        "Palani",
        "Palladum",
        "Papanasam",
        "Paramakudi",
        "Pattukottai",
        "Perambalur",
        "Perundurai",
        "Pollachi",
        "Polur",
        "Pondicherry",
        "Ponnamaravathi",
        "Ponneri",
        "Pudukkottai",
        "Rajapalayam",
        "Ramanathapuram",
        "Rameshwaram",
        "Ranipet",
        "Rasipuram",
        "Salem",
        "Sankagiri",
        "Sankaran",
        "Sathiyamangalam",
        "Sivaganga",
        "Sivakasi",
        "Sriperumpudur",
        "Srivaikundam",
        "Tenkasi",
        "Thanjavur",
        "Theni",
        "Thirumanglam",
        "Thiruraipoondi",
        "Thoothukudi",
        "Thuraiyure",
        "Tindivanam",
        "Tiruchendur",
        "Tiruchengode",
        "Tiruchirappalli",
        "Tirunelvelli",
        "Tirupathur",
        "Tirupur",
        "Tiruttani",
        "Tiruvallur",
        "Tiruvannamalai",
        "Tiruvarur",
        "Tiruvellore",
        "Tiruvettipuram",
        "Trichy",
        "Tuticorin",
        "Udumalpet",
        "Ulundurpet",
        "Usiliampatti",
        "Uthangarai",
        "Valapady",
        "Valliyoor",
        "Vaniyambadi",
        "Vedasandur",
        "Vellore",
        "Velur",
        "Vilathikulam",
        "Villupuram",
        "Virudhachalam",
        "Virudhunagar",
        "Wandiwash",
        "Yercaud"
    ],
    "Tripura": [
        "Agartala",
        "Ambasa",
        "Bampurbari",
        "Belonia",
        "Dhalai",
        "Dharam Nagar",
        "Kailashahar",
        "Kamal Krishnabari",
        "Khopaiyapara",
        "Khowai",
        "Phuldungsei",
        "Radha Kishore Pur",
        "Tripura"
    ],
    "Uttar Pradesh": [
        "Achhnera",
        "Agra",
        "Akbarpur",
        "Aliganj",
        "Aligarh",
        "Allahabad",
        "Ambedkar Nagar",
        "Amethi",
        "Amiliya",
        "Amroha",
        "Anola",
        "Atrauli",
        "Auraiya",
        "Azamgarh",
        "Baberu",
        "Badaun",
        "Baghpat",
        "Bagpat",
        "Baheri",
        "Bahraich",
        "Ballia",
        "Balrampur",
        "Banda",
        "Bansdeeh",
        "Bansgaon",
        "Bansi",
        "Barabanki",
        "Bareilly",
        "Basti",
        "Bhadohi",
        "Bharthana",
        "Bharwari",
        "Bhogaon",
        "Bhognipur",
        "Bidhuna",
        "Bijnore",
        "Bikapur",
        "Bilari",
        "Bilgram",
        "Bilhaur",
        "Bindki",
        "Bisalpur",
        "Bisauli",
        "Biswan",
        "Budaun",
        "Budhana",
        "Bulandshahar",
        "Bulandshahr",
        "Capianganj",
        "Chakia",
        "Chandauli",
        "Charkhari",
        "Chhata",
        "Chhibramau",
        "Chirgaon",
        "Chitrakoot",
        "Chunur",
        "Dadri",
        "Dalmau",
        "Dataganj",
        "Debai",
        "Deoband",
        "Deoria",
        "Derapur",
        "Dhampur",
        "Domariyaganj",
        "Dudhi",
        "Etah",
        "Etawah",
        "Faizabad",
        "Farrukhabad",
        "Fatehpur",
        "Firozabad",
        "Garauth",
        "Garhmukteshwar",
        "Gautam Buddha Nagar",
        "Ghatampur",
        "Ghaziabad",
        "Ghazipur",
        "Ghosi",
        "Gonda",
        "Gorakhpur",
        "Gunnaur",
        "Haidergarh",
        "Hamirpur",
        "Hapur",
        "Hardoi",
        "Harraiya",
        "Hasanganj",
        "Hasanpur",
        "Hathras",
        "Jalalabad",
        "Jalaun",
        "Jalesar",
        "Jansath",
        "Jarar",
        "Jasrana",
        "Jaunpur",
        "Jhansi",
        "Jyotiba Phule Nagar",
        "Kadipur",
        "Kaimganj",
        "Kairana",
        "Kaisarganj",
        "Kalpi",
        "Kannauj",
        "Kanpur",
        "Karchhana",
        "Karhal",
        "Karvi",
        "Kasganj",
        "Kaushambi",
        "Kerakat",
        "Khaga",
        "Khair",
        "Khalilabad",
        "Kheri",
        "Konch",
        "Kumaon",
        "Kunda",
        "Kushinagar",
        "Lalganj",
        "Lalitpur",
        "Lucknow",
        "Machlishahar",
        "Maharajganj",
        "Mahoba",
        "Mainpuri",
        "Malihabad",
        "Mariyahu",
        "Math",
        "Mathura",
        "Mau",
        "Maudaha",
        "Maunathbhanjan",
        "Mauranipur",
        "Mawana",
        "Meerut",
        "Mehraun",
        "Meja",
        "Mirzapur",
        "Misrikh",
        "Modinagar",
        "Mohamdabad",
        "Mohamdi",
        "Moradabad",
        "Musafirkhana",
        "Muzaffarnagar",
        "Nagina",
        "Najibabad",
        "Nakur",
        "Nanpara",
        "Naraini",
        "Naugarh",
        "Nawabganj",
        "Nighasan",
        "Noida",
        "Orai",
        "Padrauna",
        "Pahasu",
        "Patti",
        "Pharenda",
        "Phoolpur",
        "Phulpur",
        "Pilibhit",
        "Pitamberpur",
        "Powayan",
        "Pratapgarh",
        "Puranpur",
        "Purwa",
        "Raibareli",
        "Rampur",
        "Ramsanehi Ghat",
        "Rasara",
        "Rath",
        "Robertsganj",
        "Sadabad",
        "Safipur",
        "Sagri",
        "Saharanpur",
        "Sahaswan",
        "Sahjahanpur",
        "Saidpur",
        "Salempur",
        "Salon",
        "Sambhal",
        "Sandila",
        "Sant Kabir Nagar",
        "Sant Ravidas Nagar",
        "Sardhana",
        "Shahabad",
        "Shahganj",
        "Shahjahanpur",
        "Shikohabad",
        "Shravasti",
        "Siddharthnagar",
        "Sidhauli",
        "Sikandra Rao",
        "Sikandrabad",
        "Sitapur",
        "Siyana",
        "Sonbhadra",
        "Soraon",
        "Sultanpur",
        "Tanda",
        "Tarabganj",
        "Tilhar",
        "Unnao",
        "Utraula",
        "Varanasi",
        "Zamania"
    ],
    "Uttarakhand": [
        "Almora",
        "Bageshwar",
        "Bhatwari",
        "Chakrata",
        "Chamoli",
        "Champawat",
        "Dehradun",
        "Deoprayag",
        "Dharchula",
        "Dunda",
        "Haldwani",
        "Haridwar",
        "Joshimath",
        "Karan Prayag",
        "Kashipur",
        "Khatima",
        "Kichha",
        "Lansdown",
        "Munsiari",
        "Mussoorie",
        "Nainital",
        "Pantnagar",
        "Partapnagar",
        "Pauri Garhwal",
        "Pithoragarh",
        "Purola",
        "Rajgarh",
        "Ranikhet",
        "Roorkee",
        "Rudraprayag",
        "Tehri Garhwal",
        "Udham Singh Nagar",
        "Ukhimath",
        "Uttarkashi"
    ],
    "West Bengal": [
        "Adra",
        "Alipurduar",
        "Amlagora",
        "Arambagh",
        "Asansol",
        "Balurghat",
        "Bankura",
        "Bardhaman",
        "Basirhat",
        "Berhampur",
        "Bethuadahari",
        "Birbhum",
        "Birpara",
        "Bishanpur",
        "Bolpur",
        "Bongoan",
        "Bulbulchandi",
        "Burdwan",
        "Calcutta",
        "Canning",
        "Champadanga",
        "Contai",
        "Cooch Behar",
        "Daimond Harbour",
        "Dalkhola",
        "Dantan",
        "Darjeeling",
        "Dhaniakhali",
        "Dhuliyan",
        "Dinajpur",
        "Dinhata",
        "Durgapur",
        "Gangajalghati",
        "Gangarampur",
        "Ghatal",
        "Guskara",
        "Habra",
        "Haldia",
        "Harirampur",
        "Harishchandrapur",
        "Hooghly",
        "Howrah",
        "Islampur",
        "Jagatballavpur",
        "Jalpaiguri",
        "Jhalda",
        "Jhargram",
        "Kakdwip",
        "Kalchini",
        "Kalimpong",
        "Kalna",
        "Kandi",
        "Karimpur",
        "Katwa",
        "Kharagpur",
        "Khatra",
        "Krishnanagar",
        "Mal Bazar",
        "Malda",
        "Manbazar",
        "Mathabhanga",
        "Medinipur",
        "Mekhliganj",
        "Mirzapur",
        "Murshidabad",
        "Nadia",
        "Nagarakata",
        "Nalhati",
        "Nayagarh",
        "Parganas",
        "Purulia",
        "Raiganj",
        "Rampur Hat",
        "Ranaghat",
        "Seharabazar",
        "Siliguri",
        "Suri",
        "Takipur",
        "Tamluk"
    ],
    "Telangana": [
        "Achampet",
        "Adilabad",
        "Armoor",
        "Asifabad",
        "Aswaraopet",
        "Banswada",
        "Bellampalli",
        "Bhadrachalam",
        "Bhainsa",
        "Bhongir",
        "Bhooragamphad",
        "Boath",
        "Bodhan",
        "Chandoor",
        "Cherial",
        "Chevella",
        "Chinnor",
        "Devarakonda",
        "Dichpalli",
        "Eturnagaram",
        "Gadwal",
        "Gajwel",
        "Hunsabad",
        "Huzurabad",
        "Huzurnagar",
        "Hyderabad",
        "Ibrahimpatnam",
        "Jagtial",
        "Jangaon",
        "Jangareddygudem",
        "Jannaram",
        "Kalwakurthy",
        "Kamareddy",
        "Karimnagar",
        "Khammam",
        "Khanapur (AP)",
        "Kodangal",
        "Kollapur",
        "Kothagudem",
        "Madhira",
        "Mahabubabad",
        "Mahabubnagar",
        "Mahadevapur",
        "Makthal",
        "Mancherial",
        "Manthani",
        "Medachal",
        "Medak",
        "Metpalli",
        "Mriyalguda",
        "Mulug",
        "Nagarkurnool",
        "Nalgonda",
        "Nampalle",
        "Narayanakhed",
        "Narayanpet",
        "Nirmal",
        "Nizamabad",
        "Nuguru",
        "Pargi",
        "Parkal",
        "Peddapalli",
        "Ramachandrapuram",
        "Ramannapet",
        "Sangareddy",
        "Sathupalli",
        "Shadnagar",
        "Siddipet",
        "Sircilla",
        "Sirpur Kagaznagar",
        "Sudhimalla",
        "Tanduru",
        "Thungaturthy",
        "Utnor",
        "Vikrabad",
        "Wanaparthy",
        "Warangal",
        "Wardhannapet",
        "Yellandu",
        "Yellareddy",
        "Zahirabad"
    ],
    "Ladakh": [
        "Kargil",
        "Leh"
    ]
};

function bindStateCityAutocomplete(stateElement, cityElement) {
    if (!stateElement || !cityElement) return;

    stateElement.addEventListener('change', () => {
        const selectedState = stateElement.value;
        cityElement.innerHTML = ''; // clear previous options

        if (selectedState && indianStatesAndCities[selectedState]) {
            // Add placeholder option
            const defaultOpt = document.createElement('option');
            defaultOpt.value = '';
            defaultOpt.disabled = true;
            defaultOpt.selected = true;
            defaultOpt.textContent = 'Select City';
            cityElement.appendChild(defaultOpt);

            indianStatesAndCities[selectedState].forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                cityElement.appendChild(option);
            });
        } else {
            const defaultOpt = document.createElement('option');
            defaultOpt.value = '';
            defaultOpt.disabled = true;
            defaultOpt.selected = true;
            defaultOpt.textContent = 'Select State first';
            cityElement.appendChild(defaultOpt);
        }
    });
}

// 2. Dashboard Global State
let bookingsData = [];
let visitsData = [];
let quantityChart = null;
let locationChart = null;
let visitorChart = null;
let realtimeChannel = null;

// 3. DOM Elements
const loginContainer = document.getElementById('login-container');
const dashboardContainer = document.getElementById('dashboard-container');
const loginForm = document.getElementById('login-form');
const loginEmailInput = document.getElementById('admin-email');
const loginPasswordInput = document.getElementById('admin-password');
const loginErrorMsg = document.getElementById('login-error-msg');
const loginSubmitBtn = document.getElementById('login-submit-btn');
const loginBtnText = loginSubmitBtn.querySelector('.btn-text');
const loginBtnSpinner = loginSubmitBtn.querySelector('.btn-spinner');

// Helper to reset login submit button state
function resetLoginButtonState() {
    if (loginSubmitBtn) loginSubmitBtn.disabled = false;
    if (loginBtnText) loginBtnText.classList.remove('hidden');
    if (loginBtnSpinner) loginBtnSpinner.classList.add('hidden');
    if (loginPasswordInput) loginPasswordInput.value = '';
}

const adminEmailDisplay = document.getElementById('admin-email-display');
const logoutBtn = document.getElementById('logout-btn');
const realtimeAlert = document.getElementById('realtime-alert');

const kpiTotalBookings = document.getElementById('kpi-total-bookings');
const kpiTotalLiters = document.getElementById('kpi-total-liters');
const kpiPopularPkg = document.getElementById('kpi-popular-pkg') || null;
const kpiTotalVisitors = document.getElementById('kpi-total-visitors');
const visitorsTableBody = document.getElementById('visitors-table-body');
const clearVisitsBtn = document.getElementById('clear-visits-btn');

const tableSearchInput = document.getElementById('table-search');
const exportCsvBtn = document.getElementById('export-csv-btn');
const bookingsTableBody = document.getElementById('bookings-table-body');

/* ==========================================================================
   Cookie Helpers for Persistent Sessions
   ========================================================================== */
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax; Secure";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name + '=; Max-Age=-99999999; path=/; SameSite=Lax; Secure';
}

// Quick session check to prevent login screen flash on page refresh
const hasCachedSession = Object.keys(localStorage).some(key => key.includes('auth-token') || key.includes('supabase')) || (getCookie('sb-admin-access-token') && getCookie('sb-admin-refresh-token'));
if (hasCachedSession && loginContainer && dashboardContainer) {
    loginContainer.classList.add('hidden');
    dashboardContainer.classList.remove('hidden');
}


/* ==========================================================================
   4. Authentication State Watcher & Session Restoration
   ========================================================================== */
async function restoreSession() {
    if (!supabaseClient) return;
    
    try {
        let currentSession = null;
        
        // 1. Get the current session from Supabase memory/localStorage
        const { data: { session } } = await supabaseClient.auth.getSession();
        currentSession = session;
        
        // 2. If no session is found, check if we have persistent cookies to restore
        if (!currentSession) {
            const accessToken = getCookie('sb-admin-access-token');
            const refreshToken = getCookie('sb-admin-refresh-token');
            
            if (accessToken && refreshToken) {
                console.log('Attempting to restore session from cookies...');
                const { data, error } = await supabaseClient.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken
                });
                
                if (!error && data.session) {
                    currentSession = data.session;
                    console.log('Session successfully restored from cookies.');
                } else {
                    console.warn('Failed to restore session from cookies:', error ? error.message : 'No session returned');
                    eraseCookie('sb-admin-access-token');
                    eraseCookie('sb-admin-refresh-token');
                }
            }
        }
        
        // 3. Handle session state UI updates
        if (currentSession && currentSession.user) {
            console.log('Session restored successfully:', currentSession.user.email);
            adminEmailDisplay.textContent = currentSession.user.email;
            loginContainer.classList.add('hidden');
            dashboardContainer.classList.remove('hidden');
            if (bookingsData.length === 0) {
                fetchBookings();
            }
            if (visitsData.length === 0) {
                fetchVisits();
            }
            if (!realtimeChannel) {
                initRealtimeSubscription();
            }
        } else {
            console.log('No valid session, showing login.');
            loginContainer.classList.remove('hidden');
            dashboardContainer.classList.add('hidden');
            resetLoginButtonState();
        }
    } catch (err) {
        console.error('Session restore exception:', err);
        loginContainer.classList.remove('hidden');
        dashboardContainer.classList.add('hidden');
        resetLoginButtonState();
    }
}

if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange((event, session) => {
        console.log('Auth State Changed:', event, session ? session.user.email : 'null');
        if (session && session.user) {
            // Save session tokens to cookies (valid for 7 days)
            setCookie('sb-admin-access-token', session.access_token, 7);
            setCookie('sb-admin-refresh-token', session.refresh_token, 7);

            // User is authenticated successfully
            adminEmailDisplay.textContent = session.user.email;
            loginContainer.classList.add('hidden');
            dashboardContainer.classList.remove('hidden');
            
            // Only fetch if data is empty (to avoid double fetch during restoreSession)
            if (bookingsData.length === 0) {
                fetchBookings();
            }
            if (visitsData.length === 0) {
                fetchVisits();
            }
            
            // Set up real-time table notifications
            if (!realtimeChannel) {
                initRealtimeSubscription();
            }
        } else if (event === 'SIGNED_OUT' || (event !== 'INITIAL_SESSION' && !session)) {
            // Erase cookies
            eraseCookie('sb-admin-access-token');
            eraseCookie('sb-admin-refresh-token');

            // Explicitly logged out or no session
            loginContainer.classList.remove('hidden');
            dashboardContainer.classList.add('hidden');
            bookingsData = [];
            visitsData = [];
            resetLoginButtonState();
            
            // Clean up real-time channel
            if (realtimeChannel) {
                supabaseClient.removeChannel(realtimeChannel);
                realtimeChannel = null;
            }
        }
    });
}

// Call restoreSession immediately on load
restoreSession();

// Login Form Submit handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!supabaseClient) return;

    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value.trim();

    if (!email || !password) return;

    // Reset login states
    loginErrorMsg.classList.add('hidden');
    loginSubmitBtn.disabled = true;
    loginBtnText.classList.add('hidden');
    loginBtnSpinner.classList.remove('hidden');

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error('Authentication error:', error.message);
            loginErrorMsg.classList.remove('hidden');
            resetLoginButtonState();
        }
    } catch (err) {
        console.error('Unexpected auth exception:', err);
        loginErrorMsg.classList.remove('hidden');
        resetLoginButtonState();
    }
});

// Logout Button handler
logoutBtn.addEventListener('click', async () => {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
});

/* ==========================================================================
   5. Database Fetching & Updating Logic
   ========================================================================== */
async function fetchBookings() {
    if (!supabaseClient) return;

    try {
        const { data, error } = await supabaseClient
            .from('prebookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching bookings:', error.message);
            bookingsTableBody.innerHTML = `<tr><td colspan="7" class="table-no-data-row">Error fetching data. Check RLS Policies.</td></tr>`;
            return;
        }

        bookingsData = data || [];
        updateDashboardView();
    } catch (err) {
        console.error('Fetch exception:', err);
        bookingsTableBody.innerHTML = `<tr><td colspan="7" class="table-no-data-row">An unexpected error occurred.</td></tr>`;
    }
}

async function fetchVisits() {
    if (!supabaseClient) return;

    try {
        // 1. Delete visitor logs older than 12 hours to save DB space
        const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();
        const { error: deleteError } = await supabaseClient
            .from('site_visits')
            .delete()
            .lt('created_at', twelveHoursAgo);

        if (deleteError) {
            console.warn('Error cleaning up old visitor logs:', deleteError.message);
        }

        // 2. Fetch the remaining visits (from the last 12 hours)
        const { data, error } = await supabaseClient
            .from('site_visits')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching visits:', error.message);
            if (visitorsTableBody) {
                visitorsTableBody.innerHTML = `<tr><td colspan="5" class="table-no-data-row">Error fetching data. Check RLS Policies.</td></tr>`;
            }
            return;
        }

        visitsData = data || [];

        // 3. Fetch the total lifetime visitors count via RPC function
        let totalVisitorsCount = visitsData.length;
        const { data: totalCount, error: rpcError } = await supabaseClient
            .rpc('get_total_visitors');

        if (!rpcError && totalCount !== null) {
            totalVisitorsCount = totalCount;
        } else {
            console.warn('Error fetching total visitors via RPC, falling back to local count:', rpcError?.message);
        }

        updateVisitsView(totalVisitorsCount);
    } catch (err) {
        console.error('Fetch visits exception:', err);
        if (visitorsTableBody) {
            visitorsTableBody.innerHTML = `<tr><td colspan="5" class="table-no-data-row">An unexpected error occurred.</td></tr>`;
        }
    }
}

function updateVisitsView(totalCount) {
    if (kpiTotalVisitors) {
        kpiTotalVisitors.textContent = totalCount !== undefined ? totalCount : visitsData.length;
    }
    renderVisitsTable();
    try {
        renderCharts();
    } catch (e) {
        console.error('Error rendering charts after visits update:', e);
    }
}

function renderVisitsTable() {
    if (!visitorsTableBody) return;
    visitorsTableBody.innerHTML = '';

    if (visitsData.length === 0) {
        visitorsTableBody.innerHTML = `<tr><td colspan="5" class="table-loading-row" style="color: var(--text-muted);">No visitors recorded yet.</td></tr>`;
        return;
    }

    const recentVisits = visitsData.slice(0, 100);

    recentVisits.forEach(visit => {
        const row = document.createElement('tr');
        
        const date = new Date(visit.created_at);
        const formattedDate = date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }) + ' ' + date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const parsedUA = parseUserAgent(visit.user_agent);

        const city = visit.city || 'Unknown';
        const region = visit.region || 'Unknown';
        const country = visit.country || 'Unknown';
        const locationStr = (city === 'Unknown' && region === 'Unknown') 
            ? 'Unknown Location' 
            : `${city}, ${region}`;

        row.innerHTML = `
            <td class="date-cell">${formattedDate}</td>
            <td style="font-family: monospace; font-weight: 500;">${escapeHtml(visit.ip_address)}</td>
            <td>
                <span class="location-badge" style="font-weight: 600; color: var(--primary-green);">
                    ${escapeHtml(country)}
                </span>
            </td>
            <td>${escapeHtml(locationStr)}</td>
            <td style="font-size: 0.85rem; color: var(--text-muted);" title="${escapeHtml(visit.user_agent)}">${escapeHtml(parsedUA)}</td>
        `;

        visitorsTableBody.appendChild(row);
    });
}

function parseUserAgent(ua) {
    if (!ua) return 'Unknown';
    
    let os = 'Unknown';
    let browser = 'Unknown';
    
    if (ua.indexOf('Windows') !== -1) os = 'Windows';
    else if (ua.indexOf('Macintosh') !== -1) os = 'macOS';
    else if (ua.indexOf('iPhone') !== -1) os = 'iOS';
    else if (ua.indexOf('Android') !== -1) os = 'Android';
    else if (ua.indexOf('Linux') !== -1) os = 'Linux';
    
    if (ua.indexOf('Firefox') !== -1) browser = 'Firefox';
    else if (ua.indexOf('SamsungBrowser') !== -1) browser = 'Samsung Browser';
    else if (ua.indexOf('Chrome') !== -1) browser = 'Chrome';
    else if (ua.indexOf('Safari') !== -1) browser = 'Safari';
    else if (ua.indexOf('Edge') !== -1 || ua.indexOf('Edg') !== -1) browser = 'Edge';
    else if (ua.indexOf('Trident') !== -1) browser = 'Internet Explorer';
    
    if (os !== 'Unknown' && browser !== 'Unknown') {
        return `${browser} on ${os}`;
    } else if (os !== 'Unknown') {
        return `Browser on ${os}`;
    } else if (browser !== 'Unknown') {
        return browser;
    }
    return 'Unknown Device';
}

// Update stats, charts, and bookings list
function updateDashboardView() {
    try {
        updateKPIs();
    } catch (e) {
        console.error('Error updating KPIs:', e);
    }
    
    try {
        renderCharts();
    } catch (e) {
        console.error('Error rendering charts:', e);
    }
    
    try {
        renderBookingsTable();
    } catch (e) {
        console.error('Error rendering bookings table:', e);
    }
}

/* ==========================================================================
   6. KPI Calculators
   ========================================================================== */
/* Helper to format product names and weights nicely for rankings and charts */
function formatProductNameForRankings(qtyName) {
    const str = qtyName || '';
    // If it's a legacy ghee string, expand it to include the product name
    if (str === '500ml' || str === '1 Litre' || str === '2 Litres' || str === '5 Litres') {
        return `A2 Desi Pahadi Ghee - ${str}`;
    }
    
    // Format "Name (Qty)" to "Name - Qty"
    const match = str.match(/(.+?)\s*\(([^)]+)\)$/);
    if (match) {
        return `${match[1].trim()} - ${match[2].trim()}`;
    }
    
    return str;
}

/* Helper to map old legacy ghee strings to the new dropdown product values when editing */
function mapLegacyQuantityToNewProduct(qty) {
    const val = qty || '';
    if (val === '500ml') return 'A2 Desi Pahadi Ghee (500ml)';
    if (val === '1 Litre') return 'A2 Desi Pahadi Ghee (1L)';
    if (val === '2 Litres') return 'A2 Desi Pahadi Ghee (2L)';
    if (val === '5 Litres') return 'A2 Desi Pahadi Ghee (5L)';
    return val;
}

function updateKPIs() {
    // KPI 1: Total count
    const totalCount = bookingsData.length;
    kpiTotalBookings.textContent = totalCount;

    // KPI 2: Total Liters (Ghee Churned Only)
    let totalLiters = 0;
    const qtyCounts = {};

    bookingsData.forEach(booking => {
        let qty = booking.quantity || '';
        
        // Map legacy ghee package strings to new counterparts
        if (qty === '500ml') qty = 'A2 Desi Pahadi Ghee (500ml)';
        else if (qty === '1 Litre') qty = 'A2 Desi Pahadi Ghee (1L)';
        else if (qty === '2 Litres') qty = 'A2 Desi Pahadi Ghee (2L)';
        else if (qty === '5 Litres') qty = 'A2 Desi Pahadi Ghee (5L)';

        if (qty) {
            qtyCounts[qty] = (qtyCounts[qty] || 0) + 1;
        }

        // Sum Liters Churned only for Ghee
        if (qty.includes('Ghee') || qty === '500ml' || qty === '1 Litre' || qty === '2 Litres' || qty === '5 Litres') {
            if (qty.includes('500ml') || qty === '500ml') {
                totalLiters += 0.5;
            } else if (qty.includes('1L') || qty === '1 Litre') {
                totalLiters += 1.0;
            } else if (qty.includes('2L') || qty === '2 Litres') {
                totalLiters += 2.0;
            } else if (qty.includes('5L') || qty === '5 Litres') {
                totalLiters += 5.0;
            }
        }
    });

    kpiTotalLiters.textContent = `${totalLiters} L`;

    // KPI 3: Popular Products Rankings (Top 6)
    const rankedProducts = Object.entries(qtyCounts)
        .sort((a, b) => b[1] - a[1]) // sort descending by count
        .slice(0, 6); // take top 6

    const rankingsContainer = document.getElementById('kpi-popular-products-list');
    if (rankingsContainer) {
        rankingsContainer.innerHTML = '';
        
        if (rankedProducts.length === 0) {
            rankingsContainer.innerHTML = '<div style="font-size: 0.82rem; color: var(--text-muted); font-style: italic; margin-top: 10px;">No bookings recorded yet.</div>';
        } else {
            const maxVal = rankedProducts[0][1];
            
            rankedProducts.forEach(([prodName, count], index) => {
                const formattedName = formatProductNameForRankings(prodName);
                const percent = maxVal > 0 ? (count / maxVal) * 100 : 0;
                
                const rankText = index === 0 ? '1st' : index === 1 ? '2nd' : index === 2 ? '3rd' : `${index + 1}th`;
                const barColor = index === 0 ? 'var(--primary-green)' : index === 1 ? 'var(--gold-dark)' : '#5C4B3E';
                
                const itemDiv = document.createElement('div');
                itemDiv.style.marginBottom = '2px';
                itemDiv.style.width = '100%';
                
                itemDiv.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; font-size: 0.76rem; margin-bottom: 2px; color: var(--text-dark);">
                        <span style="font-weight: ${index === 0 ? '600' : 'normal'}; line-height: 1.25; padding-right: 5px; flex: 1;" title="${escapeHtml(formattedName)}">
                            ${rankText}. ${escapeHtml(formattedName)}
                        </span>
                        <span style="font-weight: 600; font-size: 0.72rem; color: ${barColor}; white-space: nowrap;">${count}</span>
                    </div>
                    <div style="background: rgba(30, 63, 32, 0.05); height: 4px; border-radius: 2px; overflow: hidden; width: 100%;">
                        <div style="background: ${barColor}; height: 100%; width: ${percent}%; border-radius: 2px; transition: width 0.4s ease;"></div>
                    </div>
                `;
                rankingsContainer.appendChild(itemDiv);
            });
        }
    }
}

/* ==========================================================================
   7. Chart.js Graphs Monitor
   ========================================================================== */
function renderCharts() {
    // 7A. Product demand distribution datasets (collects data for all catalog products including 0 counts)
    const catalogProducts = [
        "A2 Desi Pahadi Ghee (500ml)",
        "A2 Desi Pahadi Ghee (1L)",
        "A2 Desi Pahadi Ghee (2L)",
        "A2 Desi Pahadi Ghee (5L)",
        "Pahadi Pisyu Bhaang Loon (200g)",
        "Pahadi Pisyu Chatpata Laal Mirch Loon (200g)",
        "Pahadi Pisyu Mix Seasoning Loon (200g)",
        "Pahadi Gud (400g)",
        "Pahadi Saunf Gud (400g)",
        "Pahadi Dry Fruits Gud (400g)",
        "Pahadi Dry Fruits Gud (1kg)",
        "Pahadi Kaju Gud (400g)",
        "Pahadi Badam Gud (400g)",
        "Pahadi Kismis Gud (400g)",
        "Pahadi Seeds Gud (400g)",
        "Pahadi Rajma (500g)",
        "Pahadi Black Soyabean (500g)",
        "Pahadi Gauhat Ki Dal (500g)",
        "Pahadi Lobia Dal (500g)",
        "Pahadi Buransh Juice (500ml)",
        "Pahadi Amla Juice (500ml)",
        "Pahadi Orange Juice (500ml)",
        "Original Pahadi Mandua Ka Aata (1kg)",
        "Original Pahadi Mandua Ka Aata (5kg)"
    ];

    const productCounts = {};
    catalogProducts.forEach(prod => {
        productCounts[prod] = 0;
    });

    bookingsData.forEach(booking => {
        let prod = booking.quantity || 'Unknown';
        
        // Map legacy ghee package strings to new counterparts
        if (prod === '500ml') prod = 'A2 Desi Pahadi Ghee (500ml)';
        else if (prod === '1 Litre') prod = 'A2 Desi Pahadi Ghee (1L)';
        else if (prod === '2 Litres') prod = 'A2 Desi Pahadi Ghee (2L)';
        else if (prod === '5 Litres') prod = 'A2 Desi Pahadi Ghee (5L)';

        productCounts[prod] = (productCounts[prod] || 0) + 1;
    });

    const labels = Object.keys(productCounts).map(formatProductNameForRankings);
    const dataValues = Object.values(productCounts);

    const baseColors = [
        'rgba(30, 63, 32, 0.7)',    // Forest Green
        'rgba(212, 175, 55, 0.7)',  // Gold
        'rgba(92, 75, 62, 0.7)',    // Earthy Brown
        'rgba(46, 204, 113, 0.7)',  // Soft Green
        'rgba(230, 126, 34, 0.7)',  // Orange
        'rgba(155, 89, 182, 0.7)',  // Purple
        'rgba(52, 152, 219, 0.7)'   // Blue
    ];
    const baseBorders = [
        '#1E3F20',
        '#D4AF37',
        '#5C4B3E',
        '#2ECC71',
        '#E67E22',
        '#9B59B6',
        '#3498DB'
    ];
    const backgroundColors = labels.map((_, idx) => baseColors[idx % baseColors.length]);
    const borderColors = labels.map((_, idx) => baseBorders[idx % baseBorders.length]);

    // Destroy existing chart to prevent canvas reuse errors
    if (quantityChart) quantityChart.destroy();

    const qtyCtx = document.getElementById('quantityChart').getContext('2d');
    quantityChart = new Chart(qtyCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Products Pre-booked',
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1.5
            }]
        },
        options: {
            indexAxis: 'y', // Set horizontal orientation to display many product labels cleanly
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, color: '#5C4B3E' },
                    grid: { color: '#EBE4DA' }
                },
                y: {
                    ticks: { color: '#5C4B3E', font: { size: 9 } },
                    grid: { display: false }
                }
            }
        }
    });

    // 7B. Geographic demand distribution dataset (Liters/Kg and Bookings count)
    const locationCounts = {};
    bookingsData.forEach(booking => {
        const city = booking.city ? booking.city.trim() : '';
        const state = booking.state ? booking.state.trim() : '';
        let locLabel = 'Unknown';
        
        if (city && state) {
            locLabel = `${city} (${state})`;
        } else if (city) {
            locLabel = city;
        } else if (state) {
            locLabel = state;
        }
        
        let qtyLitres = 0;
        const qtyStr = booking.quantity || '';
        if (qtyStr) {
            if (qtyStr.includes('Ghee') || qtyStr === '500ml' || qtyStr === '1 Litre' || qtyStr === '2 Litres' || qtyStr === '5 Litres') {
                if (qtyStr.includes('500ml') || qtyStr === '500ml') qtyLitres = 0.5;
                else if (qtyStr.includes('1L') || qtyStr === '1 Litre') qtyLitres = 1;
                else if (qtyStr.includes('2L') || qtyStr === '2 Litres') qtyLitres = 2;
                else if (qtyStr.includes('5L') || qtyStr === '5 Litres') qtyLitres = 5;
            } else {
                if (qtyStr.includes('5kg')) qtyLitres = 5;
                else if (qtyStr.includes('1kg') || qtyStr.includes('1 kg')) qtyLitres = 1;
                else if (qtyStr.includes('500g') || qtyStr.includes('500 gms')) qtyLitres = 0.5;
                else if (qtyStr.includes('400g') || qtyStr.includes('400 gms')) qtyLitres = 0.4;
                else if (qtyStr.includes('200g') || qtyStr.includes('200 gms')) qtyLitres = 0.2;
                else qtyLitres = 1;
            }
        } else {
            qtyLitres = 1;
        }
        
        if (!locationCounts[locLabel]) {
            locationCounts[locLabel] = { litres: 0, bookings: 0 };
        }
        locationCounts[locLabel].litres += qtyLitres;
        locationCounts[locLabel].bookings += 1;
    });

    const sortedLocations = Object.entries(locationCounts)
        .filter(([label]) => label !== 'Unknown')
        .sort((a, b) => b[1].litres - a[1].litres)
        .slice(0, 5);

    const locationLabels = sortedLocations.map(item => item[0]);
    const locationLitres = sortedLocations.map(item => item[1].litres);
    const locationBookings = sortedLocations.map(item => item[1].bookings);

    if (locationChart) locationChart.destroy();

    const locCtx = document.getElementById('locationChart').getContext('2d');
    locationChart = new Chart(locCtx, {
        type: 'bar',
        data: {
            labels: locationLabels,
            datasets: [
                {
                    label: 'Total Litres',
                    data: locationLitres,
                    backgroundColor: 'rgba(212, 175, 55, 0.75)',
                    borderColor: '#D4AF37',
                    borderWidth: 1.5
                },
                {
                    label: 'Total Bookings',
                    data: locationBookings,
                    backgroundColor: 'rgba(30, 63, 32, 0.75)',
                    borderColor: '#1E3F20',
                    borderWidth: 1.5
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    display: true,
                    labels: { color: '#5C4B3E' }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: { color: '#5C4B3E' },
                    grid: { color: '#EBE4DA' }
                },
                y: {
                    ticks: { color: '#5C4B3E' },
                    grid: { display: false }
                }
            }
        }
    });

    // 7C. Visitor Location distribution dataset
    const visitorLocationCounts = {};
    visitsData.forEach(visit => {
        const city = visit.city ? visit.city.trim() : '';
        const region = visit.region ? visit.region.trim() : '';
        let locLabel = 'Unknown';
        
        if (city && region && city !== 'Unknown' && region !== 'Unknown') {
            locLabel = `${city} (${region})`;
        } else if (city && city !== 'Unknown') {
            locLabel = city;
        } else if (region && region !== 'Unknown') {
            locLabel = region;
        }
        
        visitorLocationCounts[locLabel] = (visitorLocationCounts[locLabel] || 0) + 1;
    });

    const sortedVisitorLocations = Object.entries(visitorLocationCounts)
        .filter(([label]) => label !== 'Unknown' && label !== 'undefined (undefined)')
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const visitorLabels = sortedVisitorLocations.map(item => item[0]);
    const visitorValues = sortedVisitorLocations.map(item => item[1]);

    if (visitorChart) visitorChart.destroy();

    const visitorCtx = document.getElementById('visitorChart').getContext('2d');
    visitorChart = new Chart(visitorCtx, {
        type: 'bar',
        data: {
            labels: visitorLabels,
            datasets: [{
                label: 'Unique Visits',
                data: visitorValues,
                backgroundColor: 'rgba(30, 63, 32, 0.75)',
                borderColor: '#1E3F20',
                borderWidth: 1.5
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: { color: '#5C4B3E', stepSize: 1 },
                    grid: { color: '#EBE4DA' }
                },
                y: {
                    ticks: { color: '#5C4B3E' },
                    grid: { display: false }
                }
            }
        }
    });
}

/* ==========================================================================
   8. Registry Table Renderer with Search Filters
   ========================================================================== */
/* Helper to split quantity into product type and size/weight */
function parseProductAndQty(quantityStr) {
    const str = quantityStr || '';
    if (!str) {
        return { product: '—', qty: '—' };
    }
    
    // Format matches: Name (Qty)
    const match = str.match(/(.+?)\s*\(([^)]+)\)$/);
    if (match) {
        return {
            product: match[1].trim(),
            qty: match[2].trim()
        };
    }
    
    // Legacy support
    if (str === '500ml' || str === '1 Litre' || str === '2 Litres' || str === '5 Litres') {
        return {
            product: 'A2 Desi Pahadi Ghee',
            qty: str
        };
    }
    
    return {
        product: str,
        qty: '1 Unit'
    };
}

function renderBookingsTable() {
    const filter = tableSearchInput.value.toLowerCase().trim();
    bookingsTableBody.innerHTML = '';

    const filteredData = bookingsData.filter(booking => {
        const name = (booking.full_name || '').toLowerCase();
        const mobile = (booking.mobile_number || '').toLowerCase();
        const city = (booking.city || '').toLowerCase();
        const state = (booking.state || '').toLowerCase();
        return name.includes(filter) || mobile.includes(filter) || city.includes(filter) || state.includes(filter);
    });

    if (filteredData.length === 0) {
        bookingsTableBody.innerHTML = `<tr><td colspan="7" class="table-no-data-row">No bookings match search criteria.</td></tr>`;
        return;
    }

    filteredData.forEach(booking => {
        const row = document.createElement('tr');
        
        // Date Formatter
        const date = new Date(booking.created_at);
        const formattedDate = date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }) + ' ' + date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Location formatting
        const city = booking.city ? escapeHtml(booking.city) : '';
        const state = booking.state ? escapeHtml(booking.state) : '';
        const locationStr = (city && state) ? `${city}, ${state}` : (city || state || '—');

        // Parse product and quantity
        const parsed = parseProductAndQty(booking.quantity);

        // Cells
        row.innerHTML = `
            <td class="date-cell">${formattedDate}</td>
            <td style="font-weight: 600;">${escapeHtml(booking.full_name)}</td>
            <td>+91 ${escapeHtml(booking.mobile_number)}</td>
            <td>${locationStr}</td>
            <td><span class="qty-badge" style="background: rgba(30, 63, 32, 0.06); color: var(--primary-green); font-weight: 500;">${escapeHtml(parsed.product)}</span></td>
            <td><span class="qty-badge" style="background: rgba(212, 175, 55, 0.12); color: var(--gold-dark); font-weight: 500;">${escapeHtml(parsed.qty)}</span></td>
            <td>
                <div style="display: flex; gap: 8px;">
                    <a href="tel:+91${booking.mobile_number}" class="btn-dial" title="Call Customer">
                        <i class="fa-solid fa-phone"></i>
                     </a>
                    <button class="btn-edit" onclick="openEditBookingModal(${booking.id})" title="Edit Pre-booking" style="background-color: var(--accent-light); color: var(--gold); border: 1px solid rgba(212,175,55,0.3); border-radius: var(--border-radius-sm); padding: 8px; width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: var(--transition-smooth);">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteBooking(${booking.id})" title="Delete Pre-booking">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;

        bookingsTableBody.appendChild(row);
    });
}

// Search keyup filter
tableSearchInput.addEventListener('keyup', renderBookingsTable);

// Escapes HTML tags to prevent XSS in table names
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

/* ==========================================================================
   9. Supabase Real-time Listener (Instant updates on mobile screen)
   ========================================================================== */
function initRealtimeSubscription() {
    if (!supabaseClient) return;

    realtimeChannel = supabaseClient.channel('dashboard-live-channel')
        .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'prebookings'
        }, payload => {
            console.log('Real-time Insert Payload:', payload);
            
            // Push new booking to top of array if not already present
            const alreadyExists = bookingsData.some(b => b.id === payload.new.id);
            if (!alreadyExists) {
                bookingsData.unshift(payload.new);
                updateDashboardView();
                triggerRealtimeBanner();
            }
        })
        .on('postgres_changes', {
            event: 'UPDATE',
            schema: 'public',
            table: 'prebookings'
        }, payload => {
            console.log('Real-time Update Payload:', payload);
            const idx = bookingsData.findIndex(b => b.id === payload.new.id);
            if (idx !== -1) {
                bookingsData[idx] = payload.new;
                updateDashboardView();
            } else {
                fetchBookings();
            }
        })
        .on('postgres_changes', {
            event: 'DELETE',
            schema: 'public',
            table: 'prebookings'
        }, payload => {
            console.log('Real-time Delete Payload:', payload);
            const deletedId = payload.old.id;
            bookingsData = bookingsData.filter(booking => booking.id !== deletedId);
            updateDashboardView();
        })
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'site_visits'
        }, payload => {
            console.log('Real-time Visitor Payload:', payload);
            if (payload.eventType === 'INSERT') {
                visitsData.unshift(payload.new);
                // Increment the UI counter for a new lifetime visit
                if (kpiTotalVisitors) {
                    const currentVal = parseInt(kpiTotalVisitors.textContent, 10) || 0;
                    kpiTotalVisitors.textContent = currentVal + 1;
                }
                renderVisitsTable();
            } else if (payload.eventType === 'DELETE') {
                if (payload.old && payload.old.id) {
                    visitsData = visitsData.filter(visit => visit.id !== payload.old.id);
                } else {
                    fetchVisits();
                    return;
                }
                // Do not decrement total visitors count on delete as it is a lifetime total
                renderVisitsTable();
            }
        })
        .subscribe();
}

function triggerRealtimeBanner() {
    realtimeAlert.classList.remove('hidden');
    
    // Auto collapse after 5 seconds
    setTimeout(() => {
        realtimeAlert.classList.add('hidden');
    }, 5000);
}

/* ==========================================================================
   10. CSV Exporter Utility (Shopify Customer Schema)
   ========================================================================== */
exportCsvBtn.addEventListener('click', () => {
    if (bookingsData.length === 0) {
        alert('No pre-bookings available to export.');
        return;
    }

    // Shopify Customer CSV Headers (Official Schema)
    const headers = [
        "First Name", "Last Name", "Email", "Company", "Address1", "Address2",
        "City", "Province", "Province Code", "Country", "Country Code", "Zip",
        "Phone", "Accepts Marketing", "Total Spent", "Total Orders", "Tags", "Note", "Tax Exempt"
    ];

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(",") + "\n";

    bookingsData.forEach(booking => {
        // 1. Split Full Name into First Name & Last Name
        const nameParts = (booking.full_name || '').trim().split(/\s+/);
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        // 2. Format Mobile Number (+91 prefix for India if 10-digit number)
        let rawMobile = (booking.mobile_number || '').trim();
        let phone = '';
        if (rawMobile) {
            // Remove non-digit characters just in case
            rawMobile = rawMobile.replace(/\D/g, '');
            if (rawMobile.length === 10) {
                phone = `+91${rawMobile}`;
            } else if (rawMobile.length > 10 && rawMobile.startsWith('91')) {
                phone = `+${rawMobile}`;
            } else {
                phone = rawMobile; // Fallback
            }
        }

        // 3. Format pre-booked item details as Tags
        const qty = booking.quantity || '';
        const dateStr = booking.created_at ? new Date(booking.created_at).toISOString().substring(0, 10) : '';
        
        // Shopify tags: comma-separated list of tags
        const tagsList = ["Prebooking", `Product: ${qty}`];
        const tags = `"${tagsList.join(', ')}"`;

        // 4. Create Note with date & time info
        const note = `"Pre-booked ${qty} of Ghar Aangan on ${dateStr} via Coming Soon Landing Page."`;

        // 5. Address / Location
        const city = `"${(booking.city || '').replace(/"/g, '""')}"`;
        const province = `"${(booking.state || '').replace(/"/g, '""')}"`;
        
        // Empty columns for uncollected fields
        const email = "";
        const company = "";
        const address1 = "";
        const address2 = "";
        const provinceCode = ""; // Shopify will auto-resolve if Province name is standard
        const country = "India";
        const countryCode = "IN";
        const zip = "";
        const acceptsMarketing = "yes"; // Pre-bookers typically accept updates
        const totalSpent = "0.00";
        const totalOrders = "0";
        const taxExempt = "no";

        // Row construction matching headers array order
        const row = [
            `"${firstName.replace(/"/g, '""')}"`,
            `"${lastName.replace(/"/g, '""')}"`,
            `"${email}"`,
            `"${company}"`,
            `"${address1}"`,
            `"${address2}"`,
            city,
            province,
            `"${provinceCode}"`,
            `"${country}"`,
            `"${countryCode}"`,
            `"${zip}"`,
            `"${phone}"`,
            `"${acceptsMarketing}"`,
            `"${totalSpent}"`,
            `"${totalOrders}"`,
            tags,
            note,
            `"${taxExempt}"`
        ];

        csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    
    const timestamp = new Date().toISOString().substring(0, 10);
    link.setAttribute("download", `Ghar_Aangan_Shopify_Customers_${timestamp}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});



// Helper for custom confirmation modal
function showConfirm(title, message, onConfirm) {
    const modal = document.getElementById('confirm-modal');
    const titleEl = document.getElementById('confirm-title');
    const messageEl = document.getElementById('confirm-message');
    const cancelBtn = document.getElementById('confirm-cancel-btn');
    const okBtn = document.getElementById('confirm-ok-btn');
    
    if (!modal || !titleEl || !messageEl || !cancelBtn || !okBtn) {
        // Fallback to standard confirm
        if (confirm(message)) {
            onConfirm();
        }
        return;
    }
    
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    // Clear previous event listeners by cloning
    const newCancelBtn = cancelBtn.cloneNode(true);
    const newOkBtn = okBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
    okBtn.parentNode.replaceChild(newOkBtn, okBtn);
    
    modal.classList.add('active');
    
    newCancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    newOkBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        onConfirm();
    });
    
    // Also close on overlay click
    const handleBackdrop = (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.removeEventListener('click', handleBackdrop);
        }
    };
    modal.addEventListener('click', handleBackdrop);
}

// 11. Delete Pre-booking Action (authenticated users only via RLS)
window.deleteBooking = async function(id) {
    if (!supabaseClient) return;

    showConfirm(
        "Delete Pre-booking",
        "Are you sure you want to delete this pre-booking entry? This action cannot be undone.",
        async () => {
            try {
                const { error } = await supabaseClient
                    .from('prebookings')
                    .delete()
                    .eq('id', id);

                if (error) {
                    console.error('Error deleting booking:', error.message);
                    alert('Failed to delete booking: ' + error.message);
                } else {
                    // Delete locally from bookingsData array to trigger instant UI refresh
                    bookingsData = bookingsData.filter(booking => booking.id !== id);
                    updateDashboardView();
                }
            } catch (err) {
                console.error('Delete exception:', err);
                alert('An unexpected error occurred while deleting.');
            }
        }
    );
};

// 12. Clear Visitor Logs Action (authenticated users only via RLS)
if (clearVisitsBtn) {
    clearVisitsBtn.addEventListener('click', () => {
        if (!supabaseClient) return;

        showConfirm(
            "Clear Visitor Logs",
            "Are you sure you want to clear ALL visitor logs? This action cannot be undone.",
            async () => {
                try {
                    const { error } = await supabaseClient
                        .from('site_visits')
                        .delete()
                        .gt('id', 0);

                    if (error) {
                        console.error('Error clearing visits:', error.message);
                        alert('Failed to clear visitor logs: ' + error.message);
                    } else {
                        visitsData = [];
                        // Re-fetch to ensure the RPC total count is maintained and view is updated
                        fetchVisits();
                        alert('Visitor logs cleared successfully.');
                    }
                } catch (err) {
                    console.error('Clear visits exception:', err);
                    alert('An unexpected error occurred while clearing visitor logs.');
                }
            }
        );
    });
}

/* ==========================================================================
   13. Add Manual Booking Functionality
   ========================================================================== */
const addBookingModal = document.getElementById('add-booking-modal');
const addBookingBtn = document.getElementById('add-booking-btn');
const closeBookingModalXBtn = document.getElementById('close-modal-x-btn');
const closeBookingModalBtn = document.getElementById('close-add-booking-modal');
const manualBookingForm = document.getElementById('manual-booking-form');

const manualNameInput = document.getElementById('manual-full-name');
const manualMobileInput = document.getElementById('manual-mobile-number');
const manualQuantitySelect = document.getElementById('manual-quantity');

const manualNameGroup = document.getElementById('manual-name-group');
const manualMobileGroup = document.getElementById('manual-mobile-group');
const manualQuantityGroup = document.getElementById('manual-quantity-group');

const submitManualBookingBtn = document.getElementById('submit-manual-booking-btn');
const submitBtnText = submitManualBookingBtn ? submitManualBookingBtn.querySelector('.btn-text') : null;
const submitBtnSpinner = submitManualBookingBtn ? submitManualBookingBtn.querySelector('.btn-spinner') : null;

// Toggle Modal Open
if (addBookingBtn) {
    addBookingBtn.addEventListener('click', () => {
        if (addBookingModal) {
            // Reset validation states and inputs
            resetManualForm();
            addBookingModal.classList.add('active');
        }
    });
}

// Toggle Modal Close
function closeManualBookingModal() {
    if (addBookingModal) {
        addBookingModal.classList.remove('active');
    }
}

if (closeBookingModalXBtn) {
    closeBookingModalXBtn.addEventListener('click', closeManualBookingModal);
}

if (closeBookingModalBtn) {
    closeBookingModalBtn.addEventListener('click', closeManualBookingModal);
}

// Close Modal on backdrop click
if (addBookingModal) {
    addBookingModal.addEventListener('click', (e) => {
        if (e.target === addBookingModal) {
            closeManualBookingModal();
        }
    });
}

// Reset Form Inputs and Errors
function resetManualForm() {
    if (manualBookingForm) {
        manualBookingForm.reset();
    }
    
    // Clear validation error classes
    if (manualNameGroup) manualNameGroup.classList.remove('invalid');
    if (manualMobileGroup) manualMobileGroup.classList.remove('invalid');
    if (manualQuantityGroup) manualQuantityGroup.classList.remove('invalid');
    
    // Restore button state
    if (submitManualBookingBtn) {
        submitManualBookingBtn.disabled = false;
    }
    if (submitBtnText) {
        submitBtnText.classList.remove('hidden');
    }
    if (submitBtnSpinner) {
        submitBtnSpinner.classList.add('hidden');
    }
}

// Form Validation and Submission
if (manualBookingForm) {
    manualBookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        const fullName = manualNameInput.value.trim();
        const mobileNumber = manualMobileInput.value.trim();
        const quantity = manualQuantitySelect.value;
        const stateVal = document.getElementById('manual-state') ? document.getElementById('manual-state').value.trim() : '';
        const cityVal = document.getElementById('manual-city') ? document.getElementById('manual-city').value.trim() : '';
        
        // 1. Validate Name
        if (!fullName) {
            if (manualNameGroup) manualNameGroup.classList.add('invalid');
            isValid = false;
        } else {
            if (manualNameGroup) manualNameGroup.classList.remove('invalid');
        }
        
        // 2. Validate Mobile (10-digit, starting with 6-9)
        const mobilePattern = /^[6-9]\d{9}$/;
        if (!mobileNumber || !mobilePattern.test(mobileNumber)) {
            if (manualMobileGroup) manualMobileGroup.classList.add('invalid');
            isValid = false;
        } else {
            if (manualMobileGroup) manualMobileGroup.classList.remove('invalid');
        }
        
        // 3. Validate Quantity
        if (!quantity) {
            if (manualQuantityGroup) manualQuantityGroup.classList.add('invalid');
            isValid = false;
        } else {
            if (manualQuantityGroup) manualQuantityGroup.classList.remove('invalid');
        }
        
        if (!isValid) return;
        
        // Disable button and show spinner
        if (submitManualBookingBtn) {
            submitManualBookingBtn.disabled = true;
        }
        if (submitBtnText) {
            submitBtnText.classList.add('hidden');
        }
        if (submitBtnSpinner) {
            submitBtnSpinner.classList.remove('hidden');
        }
        
        try {
            if (!supabaseClient) {
                alert('Supabase client is not initialized.');
                resetManualForm();
                return;
            }
            
            // Insert new booking
            const { data, error } = await supabaseClient
                .from('prebookings')
                .insert([
                    { full_name: fullName, mobile_number: mobileNumber, quantity: quantity, city: cityVal, state: stateVal }
                ])
                .select();
                
            console.log('[ManualBooking] Insert response:', { data, error });

            if (error) {
                console.error('Error inserting manual booking:', error.message);
                alert('Failed to add pre-booking: ' + error.message);
                
                // Restore button state
                if (submitManualBookingBtn) {
                    submitManualBookingBtn.disabled = false;
                }
                if (submitBtnText) {
                    submitBtnText.classList.remove('hidden');
                }
                if (submitBtnSpinner) {
                    submitBtnSpinner.classList.add('hidden');
                }
            } else {
                // Success: Close modal and show success alert
                closeManualBookingModal();
                
                // If real-time did not update (e.g. not connected), we manually reload
                let addedLocally = false;
                if (data && data.length > 0) {
                    const alreadyExists = bookingsData.some(b => b.id === data[0].id);
                    if (!alreadyExists) {
                        bookingsData.unshift(data[0]);
                        updateDashboardView();
                        addedLocally = true;
                    }
                }
                
                if (!addedLocally) {
                    await fetchBookings();
                }
                
                alert('Pre-booking successfully recorded!');
            }
        } catch (err) {
            console.error('Insert manual booking exception:', err);
            alert('An unexpected error occurred while adding manual booking.');
            
            // Restore button state
            if (submitManualBookingBtn) {
                submitManualBookingBtn.disabled = false;
            }
            if (submitBtnText) {
                submitBtnText.classList.remove('hidden');
            }
            if (submitBtnSpinner) {
                submitBtnSpinner.classList.add('hidden');
            }
        }
    });
}

// Clear invalid class on input/change
if (manualNameInput) {
    manualNameInput.addEventListener('input', () => {
        if (manualNameInput.value.trim()) {
            if (manualNameGroup) manualNameGroup.classList.remove('invalid');
        }
    });
}

if (manualMobileInput) {
    manualMobileInput.addEventListener('input', () => {
        const mobilePattern = /^[6-9]\d{9}$/;
        if (mobilePattern.test(manualMobileInput.value.trim())) {
            if (manualMobileGroup) manualMobileGroup.classList.remove('invalid');
        }
    });
}

if (manualQuantitySelect) {
    manualQuantitySelect.addEventListener('change', () => {
        if (manualQuantitySelect.value) {
            if (manualQuantityGroup) manualQuantityGroup.classList.remove('invalid');
        }
    });
}

/* ==========================================================================
   14. Edit Pre-booking Functionality
   ========================================================================== */
const editBookingModal = document.getElementById('edit-booking-modal');
const closeEditModalXBtn = document.getElementById('close-edit-modal-x-btn');
const closeEditModalBtn = document.getElementById('close-edit-booking-modal');
const editBookingForm = document.getElementById('edit-booking-form');

const editBookingIdInput = document.getElementById('edit-booking-id');
const editNameInput = document.getElementById('edit-full-name');
const editMobileInput = document.getElementById('edit-mobile-number');
const editCityInput = document.getElementById('edit-city');
const editStateInput = document.getElementById('edit-state');
const editQuantitySelect = document.getElementById('edit-quantity');

const editNameGroup = document.getElementById('edit-name-group');
const editMobileGroup = document.getElementById('edit-mobile-group');
const editQuantityGroup = document.getElementById('edit-quantity-group');

const submitEditBookingBtn = document.getElementById('submit-edit-booking-btn');
const editSubmitBtnText = submitEditBookingBtn ? submitEditBookingBtn.querySelector('.btn-text') : null;
const editSubmitBtnSpinner = submitEditBookingBtn ? submitEditBookingBtn.querySelector('.btn-spinner') : null;

window.openEditBookingModal = function(id) {
    const booking = bookingsData.find(b => b.id === id);
    if (!booking) return;

    // Reset errors
    if (editNameGroup) editNameGroup.classList.remove('invalid');
    if (editMobileGroup) editMobileGroup.classList.remove('invalid');
    if (editQuantityGroup) editQuantityGroup.classList.remove('invalid');

    // Populate fields
    editBookingIdInput.value = booking.id;
    editNameInput.value = booking.full_name || '';
    editMobileInput.value = booking.mobile_number || '';
    
    // Select state dropdown value
    const stateVal = booking.state || '';
    editStateInput.value = stateVal;
    
    // Clear and populate city select dropdown
    editCityInput.innerHTML = '';
    
    if (stateVal && indianStatesAndCities[stateVal]) {
        // Add placeholder option
        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.disabled = true;
        defaultOpt.textContent = 'Select City';
        editCityInput.appendChild(defaultOpt);

        indianStatesAndCities[stateVal].forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            editCityInput.appendChild(option);
        });
        
        const bookingCity = booking.city || '';
        if (bookingCity && indianStatesAndCities[stateVal].includes(bookingCity)) {
            editCityInput.value = bookingCity;
        } else {
            editCityInput.value = '';
        }
    } else {
        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.disabled = true;
        defaultOpt.selected = true;
        defaultOpt.textContent = 'Select State first';
        editCityInput.appendChild(defaultOpt);
    }
    editQuantitySelect.value = mapLegacyQuantityToNewProduct(booking.quantity || '');

    // Show modal
    if (editBookingModal) {
        editBookingModal.classList.add('active');
    }
};

function closeEditBookingModal() {
    if (editBookingModal) {
        editBookingModal.classList.remove('active');
    }
}

if (closeEditModalXBtn) closeEditModalXBtn.addEventListener('click', closeEditBookingModal);
if (closeEditModalBtn) closeEditModalBtn.addEventListener('click', closeEditBookingModal);

if (editBookingModal) {
    editBookingModal.addEventListener('click', (e) => {
        if (e.target === editBookingModal) {
            closeEditBookingModal();
        }
    });
}

if (editBookingForm) {
    editBookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isValid = true;
        const id = parseInt(editBookingIdInput.value, 10);
        const fullName = editNameInput.value.trim();
        const mobileNumber = editMobileInput.value.trim();
        const city = editCityInput.value.trim();
        const state = editStateInput.value.trim();
        const quantity = editQuantitySelect.value;

        // Validate fields
        if (!fullName) {
            if (editNameGroup) editNameGroup.classList.add('invalid');
            isValid = false;
        } else {
            if (editNameGroup) editNameGroup.classList.remove('invalid');
        }

        const mobilePattern = /^[6-9]\d{9}$/;
        if (!mobileNumber || !mobilePattern.test(mobileNumber)) {
            if (editMobileGroup) editMobileGroup.classList.add('invalid');
            isValid = false;
        } else {
            if (editMobileGroup) editMobileGroup.classList.remove('invalid');
        }

        if (!quantity) {
            if (editQuantityGroup) editQuantityGroup.classList.add('invalid');
            isValid = false;
        } else {
            if (editQuantityGroup) editQuantityGroup.classList.remove('invalid');
        }

        if (!isValid) return;

        // Loading state
        if (submitEditBookingBtn) submitEditBookingBtn.disabled = true;
        if (editSubmitBtnText) editSubmitBtnText.classList.add('hidden');
        if (editSubmitBtnSpinner) editSubmitBtnSpinner.classList.remove('hidden');

        try {
            if (!supabaseClient) {
                alert('Supabase client is not initialized.');
                closeEditBookingModal();
                return;
            }

            const { data, error } = await supabaseClient
                .from('prebookings')
                .update({
                    full_name: fullName,
                    mobile_number: mobileNumber,
                    city: city,
                    state: state,
                    quantity: quantity
                })
                .eq('id', id)
                .select();

            console.log('[EditBooking] Update response:', { data, error });

            if (error) {
                console.error('Error updating booking:', error.message);
                alert('Failed to update booking: ' + error.message);
            } else {
                // Update locally
                const updatedRow = data && data[0];
                let updated = false;
                if (updatedRow) {
                    const idx = bookingsData.findIndex(b => b.id === id);
                    if (idx !== -1) {
                        bookingsData[idx] = updatedRow;
                        updateDashboardView();
                        updated = true;
                    }
                }
                
                // Fallback: If not updated locally (e.g. data returned is empty due to RLS select), reload from DB
                if (!updated) {
                    await fetchBookings();
                }
                
                closeEditBookingModal();
            }
        } catch (err) {
            console.error('Update exception:', err);
            alert('An unexpected error occurred while saving changes.');
        } finally {
            if (submitEditBookingBtn) submitEditBookingBtn.disabled = false;
            if (editSubmitBtnText) editSubmitBtnText.classList.remove('hidden');
            if (editSubmitBtnSpinner) editSubmitBtnSpinner.classList.add('hidden');
        }
    });
}

// Bind autocomplete for Manual Booking Modal
bindStateCityAutocomplete(
    document.getElementById('manual-state'),
    document.getElementById('manual-city')
);

// Bind autocomplete for Edit Booking Modal
bindStateCityAutocomplete(
    document.getElementById('edit-state'),
    document.getElementById('edit-city')
);

