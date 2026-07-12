/* ==========================================================================
   Ghar Aangan - Interactivity and Form Logic Script
   ========================================================================== */

// Supabase Configuration
// Replace these placeholders with your actual Supabase URL and Anon Key
const SUPABASE_URL = 'https://nliyrssnkfaghwyqvsrm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5saXlyc3Nua2ZhZ2h3eXF2c3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MjE4ODYsImV4cCI6MjA5ODk5Nzg4Nn0.0SjFK9e5k766kXz1huQ59ACQvB6LU8XsW9Jc_D1W0Zk';
let supabaseClient = null;

if (typeof window.supabase !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
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

function bindStateCityAutocomplete(stateElement, cityElement, manualGroupElement, manualInputElement) {
    if (!stateElement || !cityElement) return;

    stateElement.addEventListener('change', () => {
        const selectedState = stateElement.value;
        cityElement.innerHTML = ''; // clear previous options
        
        if (manualGroupElement) manualGroupElement.classList.add('hidden');
        if (manualInputElement) {
            manualInputElement.value = '';
            manualInputElement.required = false;
        }

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

            // Add Other option if manual container is provided
            if (manualGroupElement) {
                const otherOpt = document.createElement('option');
                otherOpt.value = 'Other';
                otherOpt.textContent = 'Other (Type manually)';
                cityElement.appendChild(otherOpt);
            }
        } else {
            const defaultOpt = document.createElement('option');
            defaultOpt.value = '';
            defaultOpt.disabled = true;
            defaultOpt.selected = true;
            defaultOpt.textContent = 'Select State first';
            cityElement.appendChild(defaultOpt);
        }
        
        // Trigger change event to clear errors if needed
        cityElement.dispatchEvent(new Event('change'));
    });

    if (manualGroupElement && manualInputElement) {
        cityElement.addEventListener('change', () => {
            if (cityElement.value === 'Other') {
                manualGroupElement.classList.remove('hidden');
                manualInputElement.required = true;
                manualInputElement.focus();
            } else {
                manualGroupElement.classList.add('hidden');
                manualInputElement.value = '';
                manualInputElement.required = false;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initScrollAnimations();
    initFaqAccordion();
    initFormValidation();
    initMobileCtaScroll();
    initMobilePrebookScroll();
    logVisit();
    initRecentBookingsNotifications();
});

/* ==========================================================================
   1. Countdown Timer Logic
   ========================================================================== */
function initCountdown() {
    // Target date: August 5, 2026 at 00:00:00 (Local Time)
    const targetDate = new Date('August 5, 2026 00:00:00').getTime();

    // DOM Elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            // Target date reached
            clearInterval(timerInterval);
            document.getElementById('countdown').innerHTML = `<div class="launch-completed-msg">WE HAVE LAUNCHED!</div>`;
            return;
        }

        // Time calculations
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Format numbers to always display 2 digits
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Run immediately and set interval
    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);
}

/* ==========================================================================
   2. Scroll Triggered Reveal Animations
   ========================================================================== */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }
}

/* ==========================================================================
   3. FAQ Accordion Toggle
   ========================================================================== */
function initFaqAccordion() {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            // Collapse all other questions
            questions.forEach(otherQuestion => {
                otherQuestion.classList.remove('active');
                otherQuestion.nextElementSibling.classList.remove('show');
            });

            // Toggle selected question
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('show');
            }
        });
    });
}

/* ==========================================================================
   4. Form Validation & Local Storage Check (Duplicate Prevention)
   ========================================================================== */
function initFormValidation() {
    const form = document.getElementById('prebook-form');
    const nameInput = document.getElementById('full-name');
    const mobileInput = document.getElementById('mobile-number');
    const quantitySelect = document.getElementById('ghee-quantity');
    const cityInput = document.getElementById('city');
    const stateInput = document.getElementById('state');
    const cityManualInput = document.getElementById('city-manual');
    const cityManualGroup = document.getElementById('city-manual-group');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');

    const modal = document.getElementById('success-modal');
    const modalSuccessMsg = document.getElementById('modal-success-msg');
    const savedMobileEl = document.getElementById('saved-mobile');
    const savedQuantityEl = document.getElementById('saved-quantity');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (!form) return;

    // Initialize State & City dynamic dropdown binding
    bindStateCityAutocomplete(stateInput, cityInput);

    // Direct input check helpers
    nameInput.addEventListener('input', () => {
        validateField(nameInput, nameInput.value.trim().length > 1, 'name-error');
    });

    mobileInput.addEventListener('input', () => {
        // Filter out non-digits immediately
        mobileInput.value = mobileInput.value.replace(/\D/g, '');
        const isValidMobile = /^[6-9]\d{9}$/.test(mobileInput.value);
        validateField(mobileInput, isValidMobile, 'mobile-error');
    });

    quantitySelect.addEventListener('change', () => {
        validateField(quantitySelect, quantitySelect.value !== '', 'quantity-error');
    });

    if (cityInput) {
        cityInput.addEventListener('change', () => {
            validateField(cityInput, true, 'city-error');
        });
    }

    if (cityManualInput) {
        cityManualInput.addEventListener('input', () => {
            validateField(cityManualInput, true, 'city-manual-error');
        });
    }



    function validateField(inputElement, condition, errorId) {
        const group = inputElement.closest('.input-group');
        const errorSpan = document.getElementById(errorId);
        
        if (condition) {
            group.classList.remove('error');
            return true;
        } else {
            group.classList.add('error');
            return false;
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Perform final check
        const isNameValid = validateField(nameInput, nameInput.value.trim().length > 1, 'name-error');
        const isMobileValid = validateField(mobileInput, /^[6-9]\d{9}$/.test(mobileInput.value), 'mobile-error');
        const isQtyValid = validateField(quantitySelect, quantitySelect.value !== '', 'quantity-error');
        const isCityValid = true; // City is optional
        const isStateValid = true; // State is optional

        if (!isNameValid || !isMobileValid || !isQtyValid || !isCityValid || !isStateValid) {
            // Find first error group and focus it
            const firstError = form.querySelector('.input-group.error input, .input-group.error select');
            if (firstError) firstError.focus();
            return;
        }

        const name = nameInput.value.trim();
        const mobile = mobileInput.value.trim();
        const quantity = quantitySelect.value;
        let city = cityInput ? cityInput.value.trim() : '';
        if (city === 'Other' && cityManualInput) {
            city = cityManualInput.value.trim();
        }
        const state = stateInput ? stateInput.value.trim() : '';

        // Duplicate prevention using local storage
        let bookings = JSON.parse(localStorage.getItem('gharaangan_prebookings') || '[]');
        const isDuplicate = bookings.some(booking => booking.mobile === mobile);

        if (isDuplicate) {
            const mobileGroup = mobileInput.closest('.input-group');
            const mobileError = document.getElementById('mobile-error');
            mobileError.textContent = "This mobile number has already pre-booked. We'll contact you soon!";
            mobileGroup.classList.add('error');
            mobileInput.focus();
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        btnSpinner.classList.remove('hidden');

        // Helper function to complete pre-booking in UI
        function completePrebooking() {
            // Save booking locally
            bookings.push({ name, mobile, quantity, city, state, date: new Date().toISOString() });
            localStorage.setItem('gharaangan_prebookings', JSON.stringify(bookings));

            // Trigger recent booking notification event
            window.dispatchEvent(new CustomEvent('new-prebooking', { 
                detail: { full_name: name, quantity: quantity, city: city } 
            }));

            // Populate success modal
            savedMobileEl.textContent = `+91 ${mobile.substring(0, 5)}-${mobile.substring(5)}`;
            savedQuantityEl.textContent = quantity;
            modalSuccessMsg.innerHTML = `Congratulations <strong>${name}</strong>! Your batch reservation has been securely registered. We will send updates to your mobile number before our launch on <strong>5th August 2026</strong>.`;

            // Reset Form
            form.reset();
            
            // Remove error styles just in case
            document.querySelectorAll('.input-group').forEach(group => group.classList.remove('error'));

            // Show Success Modal
            modal.classList.add('active');

            // Restore button state
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnSpinner.classList.add('hidden');
        }

        if (supabaseClient) {
            // Real Supabase insert query
            supabaseClient
                .from('prebookings')
                .insert([
                    { full_name: name, mobile_number: mobile, quantity: quantity, city: city, state: state }
                ])
                .then(({ error }) => {
                    if (error) {
                        console.error('Supabase Error:', error);
                        alert('Supabase Database Error: ' + (error.message || 'Unknown error') + '\nDetails: ' + (error.details || 'None'));
                        
                        // Restore button state on error
                        submitBtn.disabled = false;
                        btnText.classList.remove('hidden');
                        btnSpinner.classList.add('hidden');
                    } else {
                        completePrebooking();
                    }
                })
                .catch(err => {
                    console.error('Execution Error:', err);
                    alert('Connection/Script Error: ' + (err.message || err));
                    
                    submitBtn.disabled = false;
                    btnText.classList.remove('hidden');
                    btnSpinner.classList.add('hidden');
                });
        } else {
            // Local fallback simulation (when Supabase URL is not replaced yet)
            console.log('Running local fallback simulation. Setup Supabase project keys to link.');
            setTimeout(completePrebooking, 1500);
        }
    });

    // Close Modal on Button click or backdrop click
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

/* ==========================================================================
   5. Sticky Mobile CTA scroll controller
   ========================================================================== */
function initMobileCtaScroll() {
    const ctaBar = document.getElementById('mobile-cta-bar');
    const prebookSection = document.getElementById('prebook');

    if (!ctaBar || !prebookSection) return;

    window.addEventListener('scroll', () => {
        // Only trigger on mobile viewports
        if (window.innerWidth > 768) {
            ctaBar.classList.remove('active');
            return;
        }

        const scrollPos = window.scrollY;
        const prebookRect = prebookSection.getBoundingClientRect();
        
        // Show CTA bar after scrolling 500px, but hide it when pre-book form is visible in viewport
        const formIsVisible = prebookRect.top < window.innerHeight && prebookRect.bottom > 0;

        if (scrollPos > 500 && !formIsVisible) {
            ctaBar.classList.add('active');
        } else {
            ctaBar.classList.remove('active');
        }
    });
}

/* ==========================================================================
   6. Visitor Tracking Logic (IP & Geolocation Logger)
   ========================================================================== */
async function logVisit() {
    // Prevent double logging within the same session
    if (sessionStorage.getItem('gharaangan_session_visited')) {
        return;
    }

    let ipData = {
        ip_address: 'Unknown',
        country: 'Unknown',
        city: 'Unknown',
        region: 'Unknown'
    };

    try {
        // Fetch location data from ipapi.co
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
            const data = await res.json();
            ipData.ip_address = data.ip || 'Unknown';
            ipData.country = data.country_name || 'Unknown';
            ipData.city = data.city || 'Unknown';
            ipData.region = data.region || 'Unknown';
        }
    } catch (err) {
        console.warn('Primary IP location lookup failed, attempting fallback...', err);
        try {
            // Fallback: ipinfo.io
            const res = await fetch('https://ipinfo.io/json');
            if (res.ok) {
                const data = await res.json();
                ipData.ip_address = data.ip || 'Unknown';
                ipData.country = data.country || 'Unknown';
                ipData.city = data.city || 'Unknown';
                ipData.region = data.region || 'Unknown';
            }
        } catch (fallbackErr) {
            console.error('All IP location providers failed:', fallbackErr);
        }
    }

    if (supabaseClient) {
        try {
            const { error } = await supabaseClient
                .from('site_visits')
                .insert([
                    {
                        ip_address: ipData.ip_address,
                        country: ipData.country,
                        city: ipData.city,
                        region: ipData.region,
                        user_agent: navigator.userAgent
                    }
                ]);
            
            if (!error) {
                sessionStorage.setItem('gharaangan_session_visited', 'true');
            } else {
                console.error('Database failed to log visit:', error);
            }
        } catch (dbErr) {
            console.error('Error logging visit to database:', dbErr);
        }
    }
}

/* ==========================================================================
   7. Mobile Prebook Smooth Scroll Offset
   ========================================================================== */
function initMobilePrebookScroll() {
    function scrollToForm(smooth = true) {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            const targetForm = document.getElementById('prebook-form');
            if (targetForm) {
                targetForm.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'center' });
            }
        }
    }

    // 1. Intercept link clicks on mobile
    document.querySelectorAll('a[href="#prebook"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                e.preventDefault();
                scrollToForm(true);
                // Update URL hash silently
                history.pushState(null, null, '#prebook');
            }
        });
    });

    // 2. Intercept page load with hash #prebook
    if (window.location.hash === '#prebook') {
        // Wait for rendering to complete before running scroll
        setTimeout(() => {
            scrollToForm(true);
        }, 600);
    }
}

/* ==========================================================================
   7. Recent Bookings Real-Time Notification Logic
   ========================================================================== */
function initRecentBookingsNotifications() {
    let bookingsPool = [];
    let newBookingsQueue = [];
    let displayedCount = 0;
    const maxSessionNotifications = 12; // Session cap for auto-played notifications to remain premium and non-intrusive
    
    // Create notification container
    const container = document.createElement('div');
    container.className = 'booking-toast-container';
    document.body.appendChild(container);

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#039;");
    }

    // Standardize quantity strings to clean short-form (e.g. "2 Litres" instead of "2 Litres (2 x 1L Tins)")
    function cleanQuantity(qty) {
        if (!qty) return "1 Litre";
        const match = qty.match(/^(\d+(?:\.\d+)?\s*(?:Litre|Litres|ml|g|kg))/i);
        return match ? match[1] : qty;
    }

    let currentPoolIndex = 0;

    // Load recent actual bookings from Supabase database to dynamically include real names/quantities
    async function loadHistoricBookings() {
        console.log('[RecentBookings] Initializing notification system...');
        if (!supabaseClient) {
            console.warn('[RecentBookings] Supabase client is not initialized. Notifications will only trigger on local form submissions.');
            return;
        }
        try {
            console.log('[RecentBookings] Fetching last 12 pre-bookings...');
            let { data, error } = await supabaseClient
                .from('safe_recent_bookings')
                .select('first_name, quantity, created_at, city')
                .order('created_at', { ascending: false })
                .limit(12);

            // If the view does not exist or fails (e.g. lacks city column), fallback to querying prebookings table directly
            if (error) {
                console.warn('[RecentBookings] Secure view query failed, falling back to direct table query...', error);
                const directRes = await supabaseClient
                    .from('prebookings')
                    .select('full_name, quantity, created_at, city')
                    .order('created_at', { ascending: false })
                    .limit(12);
                
                if (directRes.data) {
                    data = directRes.data.map(b => ({
                        first_name: (b.full_name || '').split(' ')[0],
                        quantity: b.quantity,
                        created_at: b.created_at,
                        city: b.city
                    }));
                } else {
                    throw directRes.error;
                }
            }

            if (data && data.length > 0) {
                bookingsPool = data.map(b => {
                    const firstName = b.first_name || "Someone";
                    const qty = cleanQuantity(b.quantity);
                    const cityVal = b.city ? b.city.trim() : '';
                    return { name: firstName, quantity: qty, city: cityVal };
                });
                console.log(`[RecentBookings] Successfully loaded ${bookingsPool.length} bookings to rotate:`, bookingsPool);
            } else {
                console.log('[RecentBookings] Database table/view is empty. No historic bookings found.');
            }
        } catch (err) {
            console.error('[RecentBookings] Database SELECT query failed. Details:', err);
        }
    }

    let currentToast = null;
    let toastTimeout = null;
    let lastToastClosedAt = 0;
    const minToastGap = 5000; // 5 seconds gap between any two notifications

    // Build and slide in a notification toast
    function showNotification(booking, isNew = false) {
        // Enforce notification limits on automatic/seeded notifications (live/real-time updates always show)
        if (displayedCount >= maxSessionNotifications && !isNew) return;

        // Remove active toast if present (immediate close without cooldown since we are transitioning)
        if (currentToast) {
            closeToast(false);
        }

        const toast = document.createElement('div');
        toast.className = 'booking-toast';
        
        const locationPhrase = booking.city ? ` from <strong>${escapeHtml(booking.city)}</strong>` : '';
        
        toast.innerHTML = `
            <div class="booking-toast-icon">
                <i class="fa-solid fa-check"></i>
            </div>
            <div class="booking-toast-content">
                <strong>${escapeHtml(booking.name)}</strong>${locationPhrase} recently pre-booked <strong>${booking.quantity}</strong> of our ghee.
            </div>
            <button class="booking-toast-close" title="Close Notification">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;

        container.appendChild(toast);
        currentToast = toast;

        // Slide in animation delay
        setTimeout(() => toast.classList.add('active'), 50);
        if (!isNew) displayedCount++;

        // Manual Close trigger
        const closeBtn = toast.querySelector('.booking-toast-close');
        closeBtn.addEventListener('click', () => closeToast(true));

        // Auto fade out timer (4 seconds display time)
        toastTimeout = setTimeout(() => closeToast(true), 4000);

        // Helper to close current toast with cooldown logic
        function closeToast(withCooldown = true) {
            if (!toast.parentNode) return;
            toast.classList.remove('active');
            
            setTimeout(() => {
                toast.remove();
                // Dispatch event after fully animated out
                window.dispatchEvent(new CustomEvent('toast-closed', { detail: { isNew: isNew } }));
            }, 600);
            
            if (currentToast === toast) {
                currentToast = null;
                if (withCooldown) {
                    lastToastClosedAt = Date.now();
                }
            }
            clearTimeout(toastTimeout);
        }
    }

    // Pull from real-time queue or pick sequentially from previous/historic pool
    function showNextNotification() {
        const now = Date.now();
        const timeSinceLastClose = now - lastToastClosedAt;

        // If a toast is currently active, do not show another one right now
        if (currentToast) return;

        // If we are in the 3-second cooldown gap, schedule it to run after the gap expires
        if (timeSinceLastClose < minToastGap) {
            const delay = minToastGap - timeSinceLastClose;
            setTimeout(showNextNotification, delay);
            return;
        }

        if (newBookingsQueue.length > 0) {
            const nextNew = newBookingsQueue.shift();
            showNotification(nextNew, true);
        } else {
            if (bookingsPool.length === 0) return;
            // Draw sequentially one by one
            const booking = bookingsPool[currentPoolIndex];
            currentPoolIndex = (currentPoolIndex + 1) % bookingsPool.length;
            showNotification(booking, false);
        }
    }

    // Formats and queues a brand new pre-booking
    function handleNewBookingNotification(dbBooking) {
        const fullName = dbBooking.full_name || "Someone";
        const firstName = fullName.split(' ')[0];
        const qty = cleanQuantity(dbBooking.quantity);
        const newBooking = { name: firstName, quantity: qty, city: dbBooking.city ? dbBooking.city.trim() : '' };
        
        // Push to real-time display queue
        newBookingsQueue.push(newBooking);

        // Prepend to pool so it rotates in later
        bookingsPool.unshift(newBooking);

        // Trigger next display check
        showNextNotification();
    }

    // Intercept local submissions (so the browser owner instantly sees their booking reflected)
    window.addEventListener('new-prebooking', (e) => {
        if (e.detail) {
            handleNewBookingNotification(e.detail);
        }
    });

    // Start scheduler
    loadHistoricBookings().then(() => {
        if (bookingsPool.length === 0) {
            console.log('[RecentBookings] Pool is empty. Automatic sequence skipped.');
            return;
        }
        
        let historicCount = 0;
        const targetHistoricCount = 10; // Show 10 historic notifications initially to create hype
        
        // Helper to queue the next automatic notification with a 5s gap
        function scheduleNextAuto() {
            if (historicCount >= targetHistoricCount || bookingsPool.length === 0) {
                console.log('[RecentBookings] Initial sequence finished. Auto-play stopped.');
                return;
            }
            setTimeout(() => {
                showNextNotification();
                historicCount++;
            }, 5000); // 5 seconds gap of silence after previous fully closes
        }

        // Listener to chain the next automatic display from the close event
        window.addEventListener('toast-closed', (e) => {
            if (e.detail && !e.detail.isNew) {
                scheduleNextAuto();
            }
        });

        console.log(`[RecentBookings] Starting initial sequence of ${Math.min(targetHistoricCount, bookingsPool.length)} notifications in 10s...`);
        // Initial delay before showing the first booking (10 seconds)
        setTimeout(() => {
            showNextNotification();
            historicCount++;
        }, 10000);
    });

    // Subscribe to live inserts via Supabase Realtime channel
    if (supabaseClient) {
        try {
            supabaseClient
                .channel('public-prebookings-realtime')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'prebookings' }, payload => {
                    if (payload.new) {
                        handleNewBookingNotification(payload.new);
                    }
                })
                .subscribe();
        } catch (e) {
            console.warn('Realtime pre-bookings channel offline:', e);
        }
    }
}


