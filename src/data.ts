import { Project, Service, FAQItem, ProcessStep, Testimony, ClientLogo } from './types';

import projectBridgeImage from './assets/images/dsab_project_bridge_1781499908630.jpg';
import heroBuildingImage from './assets/images/dsab_hero_building_1781499891337.jpg';
import projectBuildingImage from './assets/images/dsab_project_building_1781499923591.jpg';
import projectGreenBuildingImage from './assets/images/dsab_project_green_building.jpg';
import avatarUser1 from './assets/images/avatar_user_1.jpg';
import avatarUser2 from './assets/images/avatar_user_2.jpg';

export const TRANSLATIONS = {
  id: {
    navBrand: 'DSAB PRIME',
    navTagline: 'Engineering Growth, Building Legacy',
    navProjects: 'Proyek Pilihan',
    navAbout: 'Tentang Kami',
    navServices: 'Layanan',
    navProcess: 'Siklus Kerja',
    navFAQ: 'Tanya Jawab',
    navContact: 'Kontak',
    navEstimator: 'Kalkulator Biaya',

    // Hero Section
    heroBadge: '🏢 JASA KONSTRUKSI SIPIL TERINTEGRASI',
    heroTitlePart1: 'Membangun ',
    heroTitleHighlight: 'Infrastruktur Cerdas',
    heroTitlePart2: ' untuk Generasi Mendatang',
    heroDesc: 'PT DSAB (DSAB Prime) adalah mitra strategis konstruksi sipil nasional. Kami menghadirkan solusi infrastruktur komprehensif, teknik presisi tinggi, keberlanjutan lingkungan, dan efisiensi waktu berbasis teknologi mutakhir di seluruh penjuru Indonesia.',
    heroCtaPrimary: 'Mulai Konsultasi',
    heroCtaSecondary: 'Kalkulator Konstruksi',
    heroStatsProject: 'Proyek Selesai',
    heroStatsClient: 'Mitra Korporat',
    heroStatsSatis: 'Indeks Kepuasan',
    heroStatsProv: 'Provinsi Terlayani',

    // Selected Works
    projectsTitle: 'Mahakarya Konstruksi Kami',
    projectsSubtitle: 'Koleksi terpilih dari proyek infrastruktur sipil, gedung modern, dan restorasi bangunan yang kami garap dengan ketelitian standar dunia.',
    filterAll: 'Semua Bidang',
    filterInfra: 'Infrastruktur Sipil',
    filterBuilding: 'Gedung Komersial',
    filterRenovation: 'Renovasi & Restorasi',
    filterGreen: 'Konstruksi Ramah Lingkungan',
    viewProjectDetail: 'Lihat Detail Proyek',
    closeDetail: 'Tutup Detail',
    specLabelLocation: 'Lokasi Proyek',
    specLabelYear: 'Tahun Kontrak',
    specLabelBudget: 'Nilai Proyek',
    specLabelCategory: 'Kategori Solusi',
    specLabelSpecs: 'Spesifikasi Teknis',
    statusActive: 'Dalam Pengerjaan',
    statusCompleted: 'Selesai Serah Terima',

    // About Studio
    aboutBadge: '🌱 LEBIH DEKAT DENGAN PT DSAB',
    aboutTitle: 'Mempelopori Warisan Konstruksi yang Tangguh & Berkelanjutan',
    aboutParagraph1: 'Didorong oleh akselerasi pembangunan nasional dan urbanisasi yang masif di Nusantara, PT DSAB dengan merek dagang DSAB Prime hadir sebagai pionir solusi konstruksi sipil modular dan ramah lingkungan. Kami menjembatani visi arsitektural yang berani dengan realitas teknik yang kokoh.',
    aboutParagraph2: 'Setiap pondasi yang kami cor, baja yang kami sambung, dan sistem yang kami rancang tunduk pada standar manajemen mutu ISO 9001, K3 (Kesehatan & Keselamatan Kerja) ISO 45001, serta sertifikasi bangunan hijau Indonesia (GBCI). Kami mengutamakan efisiensi biaya tanpa pernah mengorbankan integritas struktural.',
    visionTitle: 'Visi Perusahaan',
    visionDesc: 'Menjadi korporasi jasa konstruksi sipil terkemuka di Asia Tenggara, diakui atas inovasi teknologi hijau, keandalan operasional, dan komitmen membangun warisan masa depan.',
    missionTitle: 'Misi Prioritas kami',
    mission1: 'Menyelenggarakan pembangunan infrastruktur dengan ketepatan waktu mutlak dan akurasi biaya.',
    mission2: 'Menerapkan metode pra-cetak cerdas dan bahan ramah lingkungan guna mereduksi emisi karbon konstruksi.',
    mission3: 'Membina talenta teknik sipil lokal guna menghasilkan keahlian tak tertandingi di lapangan.',
    mission4: 'Menjamin keselamatan maksimal pekerja melalui zero-accident policy di setiap lokasi kerja.',
    aboutCertifications: 'Sertifikasi & Lisensi Resmi Nasional',
    legalStatus: 'Status Hukum: PT DSAB Terdaftar LPJK Kelas Utama (Merek Dagang: DSAB Prime)',

    // Services
    servicesTitle: 'Layanan Konstruksi Terintegrasi',
    servicesSubtitle: 'Dari studi kelayakan tanah hingga pemeliharaan struktur jangka panjang, kami menyediakan ekosistem terpadu untuk segala kebutuhan spasial Anda.',
    serviceTimeline: 'Estimasi Durasi Kerja',
    serviceBudgetRange: 'Kisaran Anggaran Proyek',
    serviceKeyFeatures: 'Fitur Unggulan Layanan',
    serviceLearnMore: 'Detail Layanan & Alur',

    // Process
    processTitle: 'Sistem Kerja Terstruktur Kami',
    processSubtitle: 'Metodologi ketat lima tahap yang memastikan setiap tahapan dari denah virtual hingga gedung nyata berjalan presisi tanpa cacat desain atau deviasi anggaran.',
    proc1: '01. Konsultasi & Survei',
    proc2: '02. Perencanaan & Desain',
    proc3: '03. Pra-Konstruksi',
    proc4: '04. Eksekusi Lapangan',
    proc5: '05. Serah Terima & Retensi',

    // Budget Estimator
    estTitle: 'Kalkulator Estimasi Biaya Konstruksi',
    estSubtitle: 'Rancang simulasi pembiayaan awal proyek konstruksi secara mandiri dan real-time. Disesuaikan dengan indeks harga material nasional.',
    estSelectType: 'Tentukan Tipe Proyek',
    estSelectScale: 'Skala Luas Bangunan / Panjang Jalan',
    estSelectMaterial: 'Spesifikasi Material Utama',
    estSelectLocation: 'Wilayah Pembangunan',
    estIncludeEco: 'Gunakan Teknologi Ramah Lingkungan (Eco-Friendly Panel, Solar Cell)',
    estResultTitle: 'Rincian Estimasi Investasi Awal',
    estResultRange: 'Perkiraan Nilai Kontrak',
    estResultDetail: 'Draf Penawaran Awal',
    estBudgetDisclaimer: '*Nilai di atas merupakan perhitungan simulasi awal standar nasional. Nilai kontrak resmi akan disesuaikan setelah survei geoteknik dan koordinasi tim teknis kami.',
    estRequestQuota: 'Kirim Estimasi ke Tim DSAB untuk Proposal Resmi',
    estSuccessAlert: 'Simulasi Anda berhasil dikirim! Engineer DSAB Prime akan menghubungi Anda dalam waktu 1x24 jam melalui email.',
    baseCost: 'Biaya Dasar Konstruksi',
    ecoBonus: 'Investasi Teknologi Hijau (Hemat energi jangka panjang)',
    taxAdm: 'Pajak & Administrasi Legal (PPN 11%, PBG, AMDAL)',
    totalEst: 'Total Estimasi Anggaran',

    // FAQ
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    faqSubtitle: 'Temukan jawaban langsung mengenai legalitas, metode pengerjaan, jaminan retensi strukur, dan kebijakan kemitraan PT DSAB.',

    // Client section
    clientTitle: 'Dipercaya oleh Puluhan Mitra Industri',
    clientSubtitle: 'Dari BUMN, pengembang properti swasta papan atas, hingga instansi pemerintah di berbagai penjuru nusantara.',

    // Contact
    contactTitle: 'Hubungi Pusat Komando DSAB Prime',
    contactSubtitle: 'Konsultasikan ide pembangunan Anda, minta proposal lelang B2B, atau jadwalkan pertemuan langsung dengan kepala insinyur kami.',
    contactFormName: 'Nama Lengkap Anda / Perwakilan Perusahaan',
    contactFormEmail: 'Alamat Email Resmi',
    contactFormPhone: 'Nomor WhatsApp Aktif (Mulai 08...)',
    contactFormMsg: 'Deskripsi Kebutuhan Proyek atau Pesan',
    contactFormBtn: 'Kirim Pesan Presisi',
    contactSuccess: 'Pesan Spesifikasi Berhasil Terkirim! Tim kami akan segera menanggapi via email dan WhatsApp.',
    contactLoading: 'Mengirim draf...',
    officeAddress: 'Kantor Pusat & Workshop Utama',
    officeDetail: 'Jl. Mampang Prapatan 8 No. 25, Jakarta Selatan 12790',
    collabHeadline: 'Hubungi via WhatsApp Instan',
    collabButton: 'Buka Obrolan WhatsApp',

    // Toggle Labels
    lightMode: 'Mode Terang',
    darkMode: 'Mode Futuristik',
    langToggle: 'Switch to English',

    // Dynamic Live Logger
    loggerTitle: 'Sistem Telemetri Konstruksi Real-time (Virtual)',
    loggerPlaceholder: 'Menunggu inisialisasi aktivitas...',
    loggerProjectSelected: 'Melihat detail proyek: ',
    loggerEstimateCalculated: 'Menghitung estimasi proyek seharga ',
    loggerFormSubmitted: 'Draf pesan dikirim oleh: ',
    loggerLangChanged: 'Bahasa dialihkan ke Indonesia',
    loggerThemeChanged: 'Tema visual dialihkan ke ',

    footerCredits: '© 2026 PT DSAB. Seluruh Hak Cipta Dilindungi Undang-Undang. DSAB Prime merupakan merek yang dimiliki dan dikelola oleh PT DSAB.'
  },
  en: {
    navBrand: 'DSAB PRIME',
    navTagline: 'Engineering Growth, Building Legacy',
    navProjects: 'Selected Works',
    navAbout: 'About',
    navServices: 'Services',
    navProcess: 'Our Cycle',
    navFAQ: 'FAQ',
    navContact: 'Contact',
    navEstimator: 'Cost Calculator',

    // Hero Section
    heroBadge: '🏢 INTEGRATED CIVIL CONSTRUCTION SERVICES',
    heroTitlePart1: 'Engineering ',
    heroTitleHighlight: 'Smart Infrastructure',
    heroTitlePart2: ' for Future Generations',
    heroDesc: 'PT DSAB (DSAB Prime) is a strategic national civil construction partner. We deliver comprehensive infrastructure solutions, high-grade engineering precision, environmental sustainability, and technology-driven efficiency across Indonesia.',
    heroCtaPrimary: 'Start Consultation',
    heroCtaSecondary: 'Budget Estimator',
    heroStatsProject: 'Projects Delivered',
    heroStatsClient: 'Corporate Partners',
    heroStatsSatis: 'Satisfaction Index',
    heroStatsProv: 'Provinces Served',

    // Selected Works
    projectsTitle: 'Our Construction Legacies',
    projectsSubtitle: 'A curated showcase of civil infrastructure, modern developments, and high-efficiency renovations delivered with world-class structural integrity.',
    filterAll: 'All Solutions',
    filterInfra: 'Civil Infrastructure',
    filterBuilding: 'Commercial Buildings',
    filterRenovation: 'Renovation & Retrofit',
    filterGreen: 'Eco-Friendly Construction',
    viewProjectDetail: 'View Project Details',
    closeDetail: 'Close Details',
    specLabelLocation: 'Project Location',
    specLabelYear: 'Fiscal Year',
    specLabelBudget: 'Project Value',
    specLabelCategory: 'Category Solution',
    specLabelSpecs: 'Technical Specifications',
    statusActive: 'In Active Under Construction',
    statusCompleted: 'Completed & Handed Over',

    // About Studio
    aboutBadge: '🌱 GET TO KNOW PT DSAB',
    aboutTitle: 'Pioneering Resilient & Sustainable Construction Legacies',
    aboutParagraph1: 'Driven by massive national urbanisation and infrastructure acceleration across the Indonesian archipelago, PT DSAB under the trademark DSAB Prime stands as a pioneer of modular, ecologically responsible civil engineering. We bridge ambitious architectural visions with rugged structural realities.',
    aboutParagraph2: 'Every foundation we pour, steel beam we reinforce, and MEP system we engineer complies with global quality metrics including ISO 9001 (Quality Management), ISO 45001 (Occupational Health & Safety), and Green Building Council Indonesia (GBCI) standards. We prioritize budget optimization without sacrificing structural integrity.',
    visionTitle: 'Company Vision',
    visionDesc: 'To be Southeast Asia’s leading civil construction corporation, recognized for pioneering green engineering technology, operational reliability, and creating historic legacies.',
    missionTitle: 'Our Strategic Missions',
    mission1: 'Deliver massive infrastructure initiatives ahead of schedule and strictly within estimated budget parameters.',
    mission2: 'Deploy advanced precast concrete methodologies and zero-emission raw materials to reduce absolute environmental impact.',
    mission3: 'Nurture highly competitive local civil engineering talents, reinforcing standard field capabilities.',
    mission4: 'Ensure premium workspace safety through an absolute zero-accident policy across all operational worksites.',
    aboutCertifications: 'National Certifications & Key Accreditations',
    legalStatus: 'Corporate Legal Status: PT DSAB Registered under LPJK Main Class (Trademark: DSAB Prime)',

    // Services
    servicesTitle: 'Integrated Engineering Frameworks',
    servicesSubtitle: 'From initial geotechnic soil diagnostics to decade-long structural retention, we offer an interconnected cycle for sophisticated physical workspaces.',
    serviceTimeline: 'Estimated Delivery Speed',
    serviceBudgetRange: 'Estimated Budget Capital',
    serviceKeyFeatures: 'Key Specialization Flags',
    serviceLearnMore: 'Approach & Workflows',

    // Process
    processTitle: 'Our Ground-Truth Process',
    processSubtitle: 'A rigorous five-stage methodology that translates blueprints into bulletproof reality, eliminating design flaws and budget overruns.',
    proc1: '01. Consult & Soil Survey',
    proc2: '02. Blueprint & Masterplan',
    proc3: '03. Pre-Construction Prep',
    proc4: '04. Active Onsite Execution',
    proc5: '05. Delivery & Post-Retention',

    // Budget Estimator
    estTitle: 'Interactive Construction Budget Estimator',
    estSubtitle: 'Run smart project valuation simulations in real-time. Programmed based on localized average material indices in Indonesia.',
    estSelectType: 'Select Construction Archetype',
    estSelectScale: 'Scale Target Dimension (Building m² / Road meters)',
    estSelectMaterial: 'Primary Structural Material',
    estSelectLocation: 'Regional Cost Index Multiplier',
    estIncludeEco: 'Deploy Eco-Friendly Building Tech (Eco-panels, Integrated Solar Cells)',
    estResultTitle: 'Preliminary Project CapEx Details',
    estResultRange: 'Estimated Contract Evaluation',
    estResultDetail: 'Mock Proposal Breakdowns',
    estBudgetDisclaimer: '*These numbers represent preliminary, automated model evaluations using regional indexes. Definite contractual offers are formulated following our geotechnic land surveys and engineers feedback.',
    estRequestQuota: 'Submit Estimate to DSAB Engineers for Official Proposal',
    estSuccessAlert: 'Capital simulation successfully logged. A DSAB Prime planning engineer will follow up within 24 hours via email.',
    baseCost: 'Basic Structural Work',
    ecoBonus: 'Eco-Technology Premium (Yields high long-term cost benefits)',
    taxAdm: 'Tax & Compliance Provision (11% VAT, Building permits (PBG), AMDAL)',
    totalEst: 'Total Project Estimated Investment',

    // FAQ
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Read straightforward details on LPJK credentials, soil and concrete grade testings, retention bonds, and corporate bidding processes.',

    // Client section
    clientTitle: 'Endorsed by Top Corporate Partners',
    clientSubtitle: 'Pioneering collaborations with government ministries, national state-owned enterprises (BUMN), and premium commercial developers.',

    // Contact
    contactTitle: 'Reach the DSAB Command Center',
    contactSubtitle: 'Coordinate corporate bids, draft joint developments, or register a site evaluation with our principal engineering leads.',
    contactFormName: 'Your Full Name / Corporate Representative',
    contactFormEmail: 'Corporate Official Email Address',
    contactFormPhone: 'WhatsApp Active Number (Starting with 08...)',
    contactFormMsg: 'Project Objectives & Conceptual Scopes',
    contactFormBtn: 'Transmit Structural Inquiry',
    contactSuccess: 'Inquiry locked! Our business development unit will respond via email and secure WhatsApp shortly.',
    contactLoading: 'Processing raw specs...',
    officeAddress: 'Head Office & Technical Workshop',
    officeDetail: 'Jl. Mampang Prapatan 8 No. 25, South Jakarta, Jakarta 12790',
    collabHeadline: 'Instant WhatsApp Hotlines',
    collabButton: 'Launch WhatsApp Conversation',

    // Toggle Labels
    lightMode: 'Day Mode',
    darkMode: 'Futurism Mode',
    langToggle: 'Ubah ke B. Indonesia',

    // Dynamic Live Logger
    loggerTitle: 'Construction Telemetry Feed (Virtual Console)',
    loggerPlaceholder: 'Awaiting interaction variables...',
    loggerProjectSelected: 'Examining detailed specifications for: ',
    loggerEstimateCalculated: 'Calculated project valuation for ',
    loggerFormSubmitted: 'Draft inquiry filed by: ',
    loggerLangChanged: 'Language updated to English',
    loggerThemeChanged: 'Visual theme toggled to ',

    footerCredits: '© 2026 PT DSAB. All Rights Reserved. DSAB Prime is a trademark owned and managed by PT DSAB.'
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    category: 'infrastructure',
    title: {
      id: 'Sistem Flyover Lingkar Selatan Terintegrasi',
      en: 'Southern Ring Road Flyover & Smart Overpass'
    },
    location: {
      id: 'Surabaya, Jawa Timur',
      en: 'Surabaya, East Java'
    },
    year: '2025',
    budgetEst: 'Rp 345 Miliar',
    image: projectBridgeImage,
    fallbackImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    description: {
      id: 'Konstruksi jembatan flyover beton segmental pratekan sepanjang 2.4 km untuk mereduksi kemacetan di kawasan industri Surabaya. Menggunakan sensor defleksi real-time untuk pemantauan kesehatan struktural.',
      en: 'Construction of a 2.4 km prestressed segmental concrete flyover to alleviate congestion in Surabaya industrial zones. Integrates real-time structural health deflection sensors.'
    },
    specs: [
      { label: { id: 'Metode Cor', en: 'Pouring Method' }, value: 'Balanced Cantilever Precast' },
      { label: { id: 'Mutu Beton', en: 'Concrete Grade' }, value: 'K-600 High Strength Self-Compacting' },
      { label: { id: 'Sistem Sensor', en: 'Sensing Suite' }, value: 'Fiber-Optic Deflection & Temperature Monitoring' },
      { label: { id: 'Kapasitas Beban', en: 'Load Capacity' }, value: 'Class-A National Highway Standard (MST 10 Ton)' }
    ],
    completed: true
  },
  {
    id: 'proj-2',
    category: 'building',
    title: {
      id: 'Menara Korporasi Ecoglass Prime SCBD',
      en: 'Ecoglass Prime SCBD Headquarters'
    },
    location: {
      id: 'Kuningan, DKI Jakarta',
      en: 'SCBD, South Jakarta'
    },
    year: '2026',
    budgetEst: 'Rp 612 Miliar',
    image: heroBuildingImage,
    fallbackImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    description: {
      id: 'Pembangunan gedung perkantoran tinggi 28 lantai dengan kaca fotovoltaik penyerap panas matahari dan fasad baja ringan komposit. Mencapai penghematan energi hingga 38% dibanding gedung konvensional.',
      en: 'Construction of a 28-story corporate tower featuring photovoltaic solar-glazing architectural panels and structural composite light-steel. Reaches 38% energy savings relative to baseline commercial codes.'
    },
    specs: [
      { label: { id: 'Sertifikasi Hijau', en: 'Green Accreditations' }, value: 'GBCI Platinum Certified (Draf)' },
      { label: { id: 'Struktur Fasad', en: 'Facade Structure' }, value: 'Double-Skin Photovoltaic Curtain Wall' },
      { label: { id: 'Fondasi Utama', en: 'Substructural Pile' }, value: 'Bored Pile 1200mm to 42m Depth' },
      { label: { id: 'Total Luas Lantai', en: 'Total Gross Area' }, value: '45,200 square meters' }
    ],
    completed: false
  },
  {
    id: 'proj-3',
    category: 'green',
    title: {
      id: 'Kompleks Kantor R & D Hemat Energi Hijau',
      en: 'Sustainable Commercial R&D Campus'
    },
    location: {
      id: 'Ibu Kota Nusantara (IKN), Kalimantan',
      en: 'IKN Nusantara, East Kalimantan'
    },
    year: '2026',
    budgetEst: 'Rp 189 Miliar',
    image: projectBuildingImage,
    fallbackImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    description: {
      id: 'Kompleks R&D ramah lingkungan dengan konsep low-carbon footprint di IKN. Menggunakan struktur kayu rekayasa silang-lapis (CLT) yang kuat dan semen geopolimer non-klinker ramah lingkungan.',
      en: 'Low-carbon footprint eco-friendly R&D complex in IKN. Incorporates highly durable cross-laminated timber (CLT) framing and raw climate-conscious geopolimer ash concrete matrices.'
    },
    specs: [
      { label: { id: 'Faktor Karbon', en: 'Carbon Factor' }, value: 'Net-Zero Embedded Structural Wood Framework' },
      { label: { id: 'Sistem Sanitasi', en: 'Sanitation Loop' }, value: 'Zero-discharge rainwater harvesting and greywater cycle' },
      { label: { id: 'Pembangkit Daya', en: 'Energy Generation' }, value: '120kWp Roof Solar Cells & Smart Microgrid' }
    ],
    completed: false
  },
  {
    id: 'proj-4',
    category: 'renovation',
    title: {
      id: 'Restorasi & Retrofit Menara Kota Warisan',
      en: 'Heritage Landmark Retrofitting & Restoration'
    },
    location: {
      id: 'Kota Tua Jakarta, DKI Jakarta',
      en: 'Kota Tua, Jakarta'
    },
    year: '2024',
    budgetEst: 'Rp 74 Miliar',
    image: projectGreenBuildingImage,
    fallbackImage: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80',
    description: {
      id: 'Pekerjaan renovasi struktural bersejarah untuk melestarikan cagar budaya kota tua dengan penguatan fondasi (underpinning) mikro serta instalasi sistem pencegah kebakaran seismik canggih.',
      en: 'Historic structural restoration for kota tua heritage landmark, integrating robust underpinning micropiles and modern seismically stable fire prevention suites.'
    },
    specs: [
      { label: { id: 'Penguatan Struktur', en: 'Structural Retaining' }, value: 'Steel Micropiling & Fiber-Reinforced Polymer wraps' },
      { label: { id: 'Arsitektur Luar', en: 'External Architecture' }, value: 'Exact replica lime stucco recovery' },
      { label: { id: 'Proteksi Kebakaran', en: 'Fire Safety' }, value: 'Inert Gas Sprinkler System' }
    ],
    completed: true
  }
];

export const SERVICES: Service[] = [
  {
    id: 'srv-1',
    icon: 'Building2',
    title: {
      id: 'Konstruksi Gedung Bertingkat & Komersial',
      en: 'High-Rise & Commercial Construction'
    },
    shortDescription: {
      id: 'Pembangunan gedung bertingkat tinggi dengan standar struktural modern, tahan gempa, dan manajemen site tanpa suara berlebih.',
      en: 'Construction of highly durable commercial towers incorporating premium earthquake resilience and silent spatial execution.'
    },
    fullDescription: {
      id: 'PT DSAB berpengalaman panjang membangun perkantoran modern, hotel prestisius, mall, dan apartemen di Indonesia. Kami mempekerjakan tim arsitek struktur khusus dan berkoordinasi erat dengan pengembang properti guna mewujudkan bangunan dengan stabilitas tinggi, keindahan visual, dan rasio efisiensi spasial maksimal.',
      en: 'PT DSAB offers substantial experience developing grade-A corporate offices, hotels, malls, and premium vertical spaces across metropolitan Indonesia. We mobilize specialized structural engineers and lead collaborative efforts with development units to yield visual landmarks, optimal space ratios, and absolute seismic safety.'
    },
    features: {
      id: [
        'Konstruksi Struktur Utama Cor di Tempat (Cast in-situ)',
        'Fasilitas Penahan Guncangan Gempa Berlisensi Nasional',
        'Teknologi Fasad Pintar Hemat Energi (Photovoltaic Glass)',
        'Sistem Mekanikal, Elektrikal & Plumbing (MEP) Terpusat'
      ],
      en: [
        'Premium Cast In-Situ structural reinforcement',
        'Certified Seismic Isolation Dampers',
        'Advanced heat-retarding glass facades',
        'Centralized Smart Mechanical, Electrical & Plumbing (MEP)'
      ]
    },
    averageTimeline: {
      id: '12 - 24 Bulan tergantung jumlah lantai',
      en: '12 - 24 Months depending on floors count'
    },
    priceRange: 'Rp 6 Juta - Rp 15 Juta / m²'
  },
  {
    id: 'srv-2',
    icon: 'Milestone',
    title: {
      id: 'Infrastruktur Sipil, Jalan & Jembatan',
      en: 'Civil Infrastructure, Bridges & Highways'
    },
    shortDescription: {
      id: 'Konstruksi jembatan bentang panjang, jalan tol, bendungan air, dan tata letak drenase perkotaan terpadu.',
      en: 'Development of long-span suspension bridges, expressways, urban drainage routing, and complex land reclamation works.'
    },
    fullDescription: {
      id: 'Kami membantu pemerintah dan investor swasta dalam percepatan interkoneksi logistik nasional. Solusi kami meliputi perancangan jembatan pratekan segmen panjang, pembangunan jalan raya berpaving beton mutu tinggi (K-500), serta optimalisasi saluran bypass air guna menekan kerentanan risiko banjir daerah urban secara komprehensif.',
      en: 'We empower national logistics hubs by executing critical state and private infrastructure tenders. Our expertise spans precast prestressed bridge spans, heavy-duty industrial roads (concrete grades K-500+), and systemic urban bypass waterways designed to completely eradicate municipal flood risks.'
    },
    features: {
      id: [
        'Penerapan Metode Jembatan Cantilever Canggih',
        'Lapisan Jalan Aspal Hotmix & Beton Keras K-500',
        'Instalasi Box Culvert dan Drainase Modular Pra-cetak',
        'Sensor Beban Jembatan Nirkabel Pemantau Getaran'
      ],
      en: [
        'State-of-the-art Balanced Cantilever bridging',
        'K-500+ concrete grade paving & premium hotmix layers',
        'Modular precast Box Culvert drainage installation',
        'Wireless continuous structural health vibration telemetry'
      ]
    },
    averageTimeline: {
      id: '8 - 36 Bulan berbasis cakupan area geografis',
      en: '8 - 36 Months based on structural scope and scale'
    },
    priceRange: 'Rp 12 Miliar - Rp 300 Miliar per Kontrak'
  },
  {
    id: 'srv-3',
    icon: 'Sparkles',
    title: {
      id: 'Retrofit Sektoral, Renovasi & Restorasi',
      en: 'Structural Retrofitting, Renovation & Restoration'
    },
    shortDescription: {
      id: 'Penguatan fondasi cagar budaya, pemugaran interior skala megah, dan peningkatan utilitas gedung lama.',
      en: 'Structural foundation upgrades, deep energy system modernizations, and massive commercial interior restorations.'
    },
    fullDescription: {
      id: 'Menghidupkan kembali struktur lama dengan teknologi modern. Layanan kami mencakup audit kekuatan beton, penguatan kolom menggunakan selubung polimer serat karbon (FRP Wrapping), rejuvenasi instalasi kelistrikan (MEP), serta renovasi menyeluruh ruang publik/komersial agar memiliki nilai guna tinggi, hemat energi, dan aman digunakan selama beberapa dekade ke depan.',
      en: 'Reinvigorating aged structures with cutting-edge active technologies. Our work encompasses concrete integrity diagnostics, column wrapping with carbon-fiber reinforced polymers (FRP), dynamic electrical framework revamping, and full-scale spatial interior upgrades targeting maximum efficiency and safety.'
    },
    features: {
      id: [
        'Audit Forensik Beton & Struktur Bangunan Non-Destructive',
        'Penguatan Fondasi Pile-Underpinning Bawah Tanah',
        'Restorasi Persis Fasad Orisinal Cagar Budaya Sejarah',
        'Pembenahan Sistem Kabel dan Pipa Gedung tanpa Merusak Fasad'
      ],
      en: [
        'Non-Destructive concrete structural forensic testing',
        'Advanced underpinning foundation strengthening',
        'Precise historic facade restoration matching original designs',
        'Surgical mechanical utility retrofitting'
      ]
    },
    averageTimeline: {
      id: '3 - 10 Bulan tergantung tingkat kerumitan fisik',
      en: '3 - 10 Months depending on structural complexity'
    },
    priceRange: 'Rp 3 Juta - Rp 8 Juta / m²'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    metric: '100% Geotech Survey',
    title: {
      id: 'Konsultasi & Survei Tanah Kelayakan (Geoteknik)',
      en: 'Consultation & Geotechnical Evaluation'
    },
    description: {
      id: 'Tim insinyur kami meninjau lahan secara detail, melakukan pengujian daya dukung pasir/lempung (sondir, boring test), serta merancang estimasi kebutuhan ruang spasial terpadu.',
      en: 'Our engineering crew assesses your plot, carrying out standard cone penetration testing, structural soundings, and core soil diagnostic boring to avoid foundation settlements.'
    }
  },
  {
    step: '02',
    metric: 'BIM / 3D Render',
    title: {
      id: 'Perencanaan Komprehensif & Konsep BIM (Building Information Modeling)',
      en: 'Comprehensive Planning & BIM Modeling'
    },
    description: {
      id: 'Kami menggambar visual arsitektur lengkap beserta skema mekanikal-elektrikal dalam platform BIM 3D. Menghilangkan potensi bentrokan pipa/kabel sebelum dikerjakan di lapangan.',
      en: 'We develop rich architectural layouts and MEP schematics in a unified 3D Building Information Modeling (BIM) suite, eliminating interference logs before site initialization.'
    }
  },
  {
    step: '03',
    metric: 'ISO & GBCI Standards',
    title: {
      id: 'Pra-Konstruksi & Estimasi Bill of Quantity (BoQ)',
      en: 'Pre-Construction & Bill of Quantity Detail'
    },
    description: {
      id: 'Draf anggaran dihitung dengan presisi per volume meter material. Dilanjutkan pembuatan jadwal kerja taktis (S-Curve) dan pengurusan legalitas pendukung (PBG/AMDAL).',
      en: 'Draft materials pricing calculated with precise per-unit volume accuracy. Detailed project Gantt charts and national compliance certificates (AMDAL/PBG) are securely acquired.'
    }
  },
  {
    step: '04',
    metric: 'Zero Accident Goal',
    title: {
      id: 'Eksekusi Lapangan & Manajemen Mutu Ketat Berbasis K3',
      en: 'Site Construction & Rigorous Quality Audits'
    },
    description: {
      id: 'Proses pengecoran, instalasi baja, dan finishing diawasi langsung oleh manajer proyek berpengalaman dengan kepatuhan zero-accident mutlak untuk menjamin kualitas terbaik.',
      en: 'Structural pouring, steel fixing, and final envelope fittings are supervised by site managers upholding strict safety metrics for premium craft and reliability.'
    }
  },
  {
    step: '05',
    metric: '5-Year Structural Bond',
    title: {
      id: 'Serah Terima Kunci & Masa Pemeliharaan (Retensi)',
      en: 'Handover Ceremony & Structural Maintenance Bound'
    },
    description: {
      id: 'Laporan as-built drawing final diserahkan ke klien. DSAB Prime memberikan jaminan masa retensi struktur gratis guna memastikan kedaulatan keamanan pasca-pembangunan.',
      en: 'Comprehensive as-built construction documentation is compiled. DSAB Prime provides strategic warranty periods to protect investments from environmental shifts.'
    }
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: {
      id: 'Apakah PT DSAB memiliki lisensi resmi LPJK untuk proyek pemerintah BUMN?',
      en: 'Does PT DSAB hold registered LPJK licenses for BUMN state-owned projects?'
    },
    answer: {
      id: 'Ya. PT DSAB terdaftar secara sah di LPJK (Lembaga Pengembangan Jasa Konstruksi) Indonesia sebagai Kontraktor Utama Klasifikasi Besar / Utama dengan merek dagang DSAB Prime. Kami memegang Sertifikat Badan Usaha (SBU) lengkap untuk pengerjaan jembatan, jalan raya, gedung komersial, serta izin AMDAL lingkungan hidup.',
      en: 'Yes. PT DSAB is legally registered with LPJK Indonesia as a Large-tier General Contractor with DSAB Prime trademark. We hold comprehensive SBU (Sertifikat Badan Usaha) credentials for structures, highways, high-rise developments, and active AMDAL environmental approvals.'
    }
  },
  {
    id: 'faq-2',
    question: {
      id: 'Bagaimana metode DSAB Prime menjaga kepatuhan konstruksi ramah lingkungan?',
      en: 'How does DSAB Prime enforce climate-conscious or eco-friendly building standards?'
    },
    answer: {
      id: 'Kami adalah anggota pendukung GBCI (Green Building Council Indonesia). Kami mengutamakan penggunaan semen pozzolan rendah emisi karbondioksida, sistem pengumpul air hujan otomatis di atap gedung perkantoran, optimalisasi ventilasi silang guna meminimalkan pendingin AC, serta meminimalkan limbah kayu cor melalui cetakan besi modular prefabrikasi.',
      en: 'We are active supporters of GBCI. We prioritize low-emission pozzolanic cements, integrated greywater routing, smart cross-ventilation modules preventing heavy air conditioning, and steel mold shuttering to completely eliminate raw wood waste across all site setups.'
    }
  },
  {
    id: 'faq-3',
    question: {
      id: 'Berapa lama masa garansi pemeliharaan (retensi) yang diberikan setelah serah terima?',
      en: 'What is the duration of structural maintenance or retention warranty offered?'
    },
    answer: {
      id: 'Untuk proyek gedung komersial tinggi dan infrastruktur sipil besar, kami memberikan masa retensi pemeliharaan struktural hingga 5 tahun yang dilindungi garansi tertulis. Sementara untuk proyek perbaikan fungsional menengah, kami memberikan masa jaminan pemeliharaan 6 hingga 12 bulan setelah tanggal serah terima kunci (BAST).',
      en: 'For high-rise buildings and major civil infrastructure contracts, we provide a formal structural warranty up to 5 years. For general commercial renovation assignments, a structural retention period spanning 6 to 12 months is guaranteed post key handover (BAST).'
    }
  },
  {
    id: 'faq-4',
    question: {
      id: 'Bagaimana alur pembayaran kontraktual di DSAB Prime?',
      en: 'What is the contractual payment structure offered by DSAB Prime?'
    },
    answer: {
      id: 'Kami menawarkan sistem pembayaran berbasis progres termin fisik rill (Monthly Progress Billing), didukung oleh uang muka (DP) di awal berkisar 15% - 20% dan jaminan retensi 5% di akhir masa garansi. Skema pembayaran didesain fleksibel dan dapat dijamin melalui jaminan bank (Bank Guarantee) nasional terpercaya.',
      en: 'We offer standardized Monthly Progress Billing based on audited onsite structural evaluations, supported by a 15% - 20% initial Down Payment and a standard 5% retention escrow bound. Skemas are highly flexible and fully compatible with premium National Bank Guarantees.'
    }
  }
];

export const TESTIMONIALS: Testimony[] = [
  {
    id: 'test-1',
    name: 'Ir. Hermawan Wicaksono',
    role: { id: 'Kepala Divisi Properti Utama', en: 'Head of Prime Property Development' },
    company: 'PT Wijaya Land Tbk',
    quote: {
      id: 'Komitmen DSAB Prime terhadap efisiensi waktu sangat luar biasa. Gedung perkantoran kami di SCBD dapat diserahterimakan 15 hari lebih cepat dari jadwal kontrak, dengan presisi pengecoran beton yang memenuhi seluruh uji laboratorium independen.',
      en: 'DSAB Prime’s adherence to schedules is unmatched. Our business tower in SCBD was completed and delivered 15 days ahead of schedule, showcasing concrete core checks that perfectly passed independent laboratory benchmarks.'
    },
    avatarUrl: avatarUser1
  },
  {
    id: 'test-2',
    name: 'Siti Rahmawati, M.T.',
    role: { id: 'Pejabat Pembuat Komitmen Sarana Sipil', en: 'State Civil Infrastructure Administrator' },
    company: 'Dinas Bina Marga Regional',
    quote: {
      id: 'Konstruksi segmental pratekan pada proyek jalan lingkar yang digarap PT DSAB dieksekusi dengan tata kelola lalu lintas yang pintar. Gangguan publik sangat minim, dan laporan mutu harian disajikan secara transparan melalui sistem telemetri digital.',
      en: 'Prestressed segmental placement on the circular highway was managed under clever transit routes. Public impact was exceptionally low, and daily structural charts were shared transparently with our department.'
    },
    avatarUrl: avatarUser2
  }
];

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'PT Angkasa Raya BUMN', logoText: 'AR BUMN', industry: { id: 'Aviasi & Logistik', en: 'Aviation & Logistics' } },
  { name: 'PT Wijaya Land Tbk', logoText: 'WJ LAND', industry: { id: 'Pengembang Properti', en: 'Real Estate Developer' } },
  { name: 'Nusantara Capital Group', logoText: 'NUSA CAPITAL', industry: { id: 'Konsorsium Infrastruktur', en: 'Consortium Corporate' } },
  { name: 'Kementerian Hubling RI', logoText: 'PEMERINTAH RI', industry: { id: 'Instansi Negara', en: 'State Ministry' } },
  { name: 'PT Citra Konstruksi Lestari', logoText: 'CITRA UTAMA', industry: { id: 'Semen & Beton Nasional', en: 'National Cement Co.' } }
];
