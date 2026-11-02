// ===== EDIT THESE =====
export const PRICE = 8900, OLD_PRICE = 11900;           // DA
export const WHATSAPP = "213550000000";                 // number with country code, no +
export const FEE_NORTH = { home: 600, desk: 400 };      // delivery fees (DA)
export const FEE_SOUTH = { home: 1000, desk: 800 };
const SOUTH = [1, 8, 11, 30, 33, 37, 39, 47, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58];
export const feeFor = (code, type) => (SOUTH.includes(code) ? FEE_SOUTH : FEE_NORTH)[type];

// code|French|Arabic
export const WILAYAS = `Adrar|أدرار;Chlef|الشلف;Laghouat|الأغواط;Oum El Bouaghi|أم البواقي;Batna|باتنة;Béjaïa|بجاية;Biskra|بسكرة;Béchar|بشار;Blida|البليدة;Bouira|البويرة;Tamanrasset|تمنراست;Tébessa|تبسة;Tlemcen|تلمسان;Tiaret|تيارت;Tizi Ouzou|تيزي وزو;Alger|الجزائر;Djelfa|الجلفة;Jijel|جيجل;Sétif|سطيف;Saïda|سعيدة;Skikda|سكيكدة;Sidi Bel Abbès|سيدي بلعباس;Annaba|عنابة;Guelma|قالمة;Constantine|قسنطينة;Médéa|المدية;Mostaganem|مستغانم;M'Sila|المسيلة;Mascara|معسكر;Ouargla|ورقلة;Oran|وهران;El Bayadh|البيض;Illizi|إليزي;Bordj Bou Arréridj|برج بوعريريج;Boumerdès|بومرداس;El Tarf|الطارف;Tindouf|تندوف;Tissemsilt|تيسمسيلت;El Oued|الوادي;Khenchela|خنشلة;Souk Ahras|سوق أهراس;Tipaza|تيبازة;Mila|ميلة;Aïn Defla|عين الدفلى;Naâma|النعامة;Aïn Témouchent|عين تموشنت;Ghardaïa|غرداية;Relizane|غليزان;Timimoun|تيميمون;Bordj Badji Mokhtar|برج باجي مختار;Ouled Djellal|أولاد جلال;Béni Abbès|بني عباس;In Salah|عين صالح;In Guezzam|عين قزام;Touggourt|تقرت;Djanet|جانت;El M'Ghair|المغير;El Meniaa|المنيعة`
  .split(";").map((s, i) => { const [fr, ar] = s.split("|"); return { code: i + 1, fr, ar }; });

// SAMPLE ONLY. Add the full communes list (see README), keyed by wilaya code.
// Wilayas without an entry get a free-text baladiya field.
export const COMMUNES = {
  16: ["Alger Centre", "Bab El Oued", "El Harrach", "Bab Ezzouar", "Dar El Beïda", "Hussein Dey", "Kouba", "Birtouta", "Chéraga"],
  31: ["Oran", "Bir El Djir", "Es Senia", "Arzew", "Aïn El Turck", "Mers El Kébir", "Bethioua", "Gdyel", "Boutlélis"],
  25: ["Constantine", "El Khroub", "Aïn Smara", "Hamma Bouziane", "Didouche Mourad"],
};

export const T = {
  ar: {
    dir: "rtl", lang: "FR", order: "اطلب الآن", off: "تخفيض", da: "دج",
    h1: "اطبع ذكرياتك في ثوانٍ", sub: "بحجم الجيب. بلوتوث. بدون حبر.",
    trust: ["الدفع عند الاستلام", "توصيل لـ 58 ولاية", "التوصيل خلال 24-48 ساعة"],
    bTitle: "لماذا هذه الطابعة؟",
    ben: [["حجم الجيب", "تدخل في الجيب وتأخذها أينما ذهبت."], ["من هاتفك", "اتصال بلوتوث، اختر الصورة واطبع."], ["بدون حبر", "تقنية الطباعة الحرارية، لا خراطيش ولا تكاليف إضافية."], ["صور تدوم", "صور مقاومة للماء والبهتان."]],
    hTitle: "كيف تعمل؟",
    steps: ["صل الهاتف عبر البلوتوث", "اختر صورتك وعدّلها", "اضغط طباعة واستلم صورتك"],
    gTitle: "صور المنتج", sTitle: "المواصفات",
    specs: [["الاتصال", "Bluetooth 5.0"], ["مقاس الصورة", "3 × 2 إنش (ZINK)"], ["الدقة", "313 × 400 نقطة"], ["الشحن", "USB-C"], ["الوزن", "حوالي 180 غ"]],
    rTitle: "آراء الزبائن",
    reviews: [["أمينة", "وهران", "جودة ممتازة والتوصيل كان سريعاً، شكراً!"], ["يوسف", "الجزائر", "سهلة الاستعمال، الأطفال أحبوها كثيراً."], ["ياسمين", "قسنطينة", "هدية رائعة، الصور واضحة جداً."]],
    fTitle: "أسئلة شائعة",
    faq: [["كم مدة التوصيل؟", "من 24 إلى 48 ساعة حسب الولاية."], ["هل أدفع مسبقاً؟", "لا، تدفع عند استلام الطلب."], ["هل تعمل مع آيفون وأندرويد؟", "نعم، عبر تطبيق Mi Home / Xiaomi Home."], ["هل يمكن الإرجاع؟", "نعم، يمكنك فحص المنتج عند الاستلام."]],
    formTitle: "أكمل طلبك", name: "الاسم الكامل", phone: "رقم الهاتف", wilaya: "الولاية", baladiya: "البلدية",
    choose: "اختر", home: "إلى المنزل", desk: "إلى المكتب (Stop desk)", qty: "الكمية",
    product: "المنتج", delivery: "التوصيل", total: "المجموع", buy: "اشتري الآن", sending: "جاري الإرسال...",
    pay: "الدفع عند استلام الطلب", errPhone: "رقم هاتف غير صالح (05 / 06 / 07 + 8 أرقام)", errName: "أدخل اسمك", errSel: "اختر الولاية والبلدية",
    errSrv: "حدث خطأ، حاول مرة أخرى.", ok: "شكراً! سنتصل بك لتأكيد طلبك.",
    timer: "ينتهي العرض خلال", contact: "اتصل بنا",
  },
  fr: {
    dir: "ltr", lang: "ع", order: "Commander", off: "de réduction", da: "DA",
    h1: "Imprimez vos souvenirs en quelques secondes", sub: "Format de poche. Bluetooth. Sans encre.",
    trust: ["Paiement à la livraison", "Livraison 58 wilayas", "Livré en 24-48h"],
    bTitle: "Pourquoi cette imprimante ?",
    ben: [["Format poche", "Elle se glisse dans une poche, partout avec vous."], ["Depuis votre téléphone", "Bluetooth: choisissez la photo, imprimez."], ["Sans encre", "Impression thermique, aucune cartouche à acheter."], ["Photos durables", "Résistantes à l'eau et à la décoloration."]],
    hTitle: "Comment ça marche ?",
    steps: ["Connectez le téléphone en Bluetooth", "Choisissez et retouchez la photo", "Appuyez sur imprimer et récupérez-la"],
    gTitle: "Photos du produit", sTitle: "Caractéristiques",
    specs: [["Connexion", "Bluetooth 5.0"], ["Format photo", "3 × 2 pouces (ZINK)"], ["Résolution", "313 × 400 points"], ["Charge", "USB-C"], ["Poids", "environ 180 g"]],
    rTitle: "Avis clients",
    reviews: [["Amina", "Oran", "Super qualité et livraison rapide, merci !"], ["Youcef", "Alger", "Facile à utiliser, les enfants adorent."], ["Yasmine", "Constantine", "Un cadeau parfait, photos très nettes."]],
    fTitle: "Questions fréquentes",
    faq: [["Quel est le délai de livraison ?", "De 24 à 48h selon la wilaya."], ["Dois-je payer d'avance ?", "Non, vous payez à la réception."], ["Compatible iPhone et Android ?", "Oui, via l'application Xiaomi Home."], ["Puis-je retourner le produit ?", "Oui, vous pouvez le vérifier à la réception."]],
    formTitle: "Finalisez votre commande", name: "Nom complet", phone: "Téléphone", wilaya: "Wilaya", baladiya: "Baladiya",
    choose: "Choisir", home: "À domicile", desk: "Bureau (Stop desk)", qty: "Quantité",
    product: "Produit", delivery: "Livraison", total: "Total", buy: "Acheter maintenant", sending: "Envoi...",
    pay: "Paiement à la réception de la commande", errPhone: "Numéro invalide (05 / 06 / 07 + 8 chiffres)", errName: "Entrez votre nom", errSel: "Choisissez la wilaya et la baladiya",
    errSrv: "Une erreur est survenue, réessayez.", ok: "Merci ! Nous vous appellerons pour confirmer votre commande.",
    timer: "L'offre se termine dans", contact: "Contact",
  },
};
