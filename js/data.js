// Datos del centro y del selector «Què tracto».
// Cada problema enlaza solo con lo que Maria José anuncia: el vinilo de su puerta (masaje, drenaje linfático,
// reflexología, naturopatía y la lista de indicaciones de INDIBA Activ Medical) y sus publicaciones de Instagram
// (qué aporta INDIBA, en qué casos usa PHYSIUM, gestión emocional). Fuentes en .claude/indiba-lloret.md.
window.SITE = {
  tel: '+34679899599',
  telTxt: '679 89 95 99',
  wa: '34679899599',
  // horario de Google: lunes a viernes 11:00–19:00 (0 = domingo)
  hours: { 1: [660, 1140], 2: [660, 1140], 3: [660, 1140], 4: [660, 1140], 5: [660, 1140] },
  msg: {
    ca: 'Hola Maria José, voldria demanar hora a la consulta.',
    es: 'Hola Maria José, quería pedir cita en la consulta.',
    en: 'Hello Maria José, I would like to book an appointment.',
    fr: 'Bonjour Maria José, je voudrais prendre rendez-vous.'
  },
  msgC: {
    ca: 'Hola Maria José, voldria demanar hora per fer una valoració. Motiu: {c}.',
    es: 'Hola Maria José, quería pedir cita para una valoración. Motivo: {c}.',
    en: 'Hello Maria José, I would like to book an assessment. Reason: {c}.',
    fr: 'Bonjour Maria José, je voudrais prendre rendez-vous pour un bilan. Motif : {c}.'
  }
};

window.TREAT = {
  esquena: {
    use: ['manual', 'indiba', 'physium', 'emocio'],
    ca: 'Dolor cervical, dorsal i lumbar, contractures i tensions musculars profundes, com algunes ciàtiques que es resisteixen als tractaments convencionals. L’estrès també es pot notar al coll i a l’esquena.',
    es: 'Dolor cervical, dorsal y lumbar, contracturas y tensiones musculares profundas, como algunas ciáticas que se resisten a los tratamientos convencionales. El estrés también se puede notar en el cuello y la espalda.',
    en: 'Neck, mid-back and lower-back pain, contractures and deep muscle tension, such as some sciatica that resists conventional treatment. Stress can also show up in the neck and back.',
    fr: 'Douleurs cervicales, dorsales et lombaires, contractures et tensions musculaires profondes, comme certaines sciatiques qui résistent aux traitements classiques. Le stress peut aussi se ressentir dans le cou et le dos.'
  },
  artrosi: {
    use: ['manual', 'indiba'],
    ca: 'Artrosi, per exemple al genoll: teràpia manual i INDIBA per modular el dolor i disminuir la sensació de rigidesa.',
    es: 'Artrosis, por ejemplo en la rodilla: terapia manual e INDIBA para modular el dolor y disminuir la sensación de rigidez.',
    en: 'Osteoarthritis, for example in the knee: manual therapy and INDIBA to help modulate pain and ease the feeling of stiffness.',
    fr: 'Arthrose, par exemple au genou : thérapie manuelle et INDIBA pour moduler la douleur et diminuer la sensation de raideur.'
  },
  tendons: {
    use: ['manual', 'indiba'],
    ca: 'Tendinitis i tendinopaties: INDIBA afavoreix la circulació i la recuperació dels teixits i complementa el treball manual i l’exercici.',
    es: 'Tendinitis y tendinopatías: INDIBA favorece la circulación y la recuperación de los tejidos y complementa el trabajo manual y el ejercicio.',
    en: 'Tendinitis and tendinopathy: INDIBA supports circulation and tissue recovery, alongside manual work and exercise.',
    fr: 'Tendinites et tendinopathies : INDIBA favorise la circulation et la récupération des tissus, en complément du travail manuel et de l’exercice.'
  },
  lesions: {
    use: ['manual', 'indiba'],
    ca: 'Esquinços, fractures, trencaments musculars i hematomes, per facilitar la recuperació dels teixits.',
    es: 'Esguinces, fracturas, roturas musculares y hematomas, para facilitar la recuperación de los tejidos.',
    en: 'Sprains, fractures, muscle tears and bruising, to help the tissues recover.',
    fr: 'Entorses, fractures, déchirures musculaires et hématomes, pour faciliter la récupération des tissus.'
  },
  fascitis: {
    use: ['manual', 'indiba'],
    ca: 'Fascitis plantar: teràpia manual i INDIBA a la planta del peu.',
    es: 'Fascitis plantar: terapia manual e INDIBA en la planta del pie.',
    en: 'Plantar fasciitis: manual therapy and INDIBA on the sole of the foot.',
    fr: 'Fasciite plantaire : thérapie manuelle et INDIBA sous la plante du pied.'
  },
  esport: {
    use: ['manual', 'massatge', 'indiba', 'physium'],
    ca: 'Massatge esportiu, preparació abans de competir i recuperació després d’entrenar. També suport en lesions esportives, fins i tot en fase aguda segons la valoració.',
    es: 'Masaje deportivo, preparación antes de competir y recuperación después de entrenar. También apoyo en lesiones deportivas, incluso en fase aguda según la valoración.',
    en: 'Sports massage, preparation before competing and recovery after training. Also support for sports injuries, even in the acute phase depending on the assessment.',
    fr: 'Massage sportif, préparation avant la compétition et récupération après l’entraînement. Aussi un soutien en cas de blessure sportive, même en phase aiguë selon le bilan.'
  },
  operacions: {
    use: ['manual', 'indiba', 'physium'],
    ca: 'Tractaments postoperatoris, fibrosi i cicatrius adherides o rígides, també després de pròtesis, cesàries o operacions de pit, fins i tot antigues.',
    es: 'Tratamientos postoperatorios, fibrosis y cicatrices adheridas o rígidas, también después de prótesis, cesáreas u operaciones de pecho, incluso antiguas.',
    en: 'Post-operative treatment, fibrosis and adherent or stiff scars, including after joint replacements, C-sections or breast surgery, even old ones.',
    fr: 'Soins postopératoires, fibroses et cicatrices adhérentes ou rigides, y compris après une prothèse, une césarienne ou une opération du sein, même anciennes.'
  },
  cames: {
    use: ['drenatge', 'massatge', 'physium'],
    ca: 'Cames cansades, retenció de líquids i lipedema: drenatge limfàtic i massatge circulatori. PHYSIUM hi suma l’estímul de la circulació i del drenatge.',
    es: 'Piernas cansadas, retención de líquidos y lipedema: drenaje linfático y masaje circulatorio. PHYSIUM suma el estímulo de la circulación y del drenaje.',
    en: 'Tired legs, fluid retention and lipoedema: lymphatic drainage and circulatory massage. PHYSIUM adds stimulation of circulation and drainage.',
    fr: 'Jambes lourdes, rétention d’eau et lipœdème : drainage lymphatique et massage circulatoire. PHYSIUM y ajoute la stimulation de la circulation et du drainage.'
  },
  estres: {
    use: ['reflex', 'naturo', 'emocio'],
    ca: 'Estrès, migranyes, fibromiàlgia i fatiga crònica: reflexologia, naturopatia i gestió emocional, perquè el cos i les emocions estan connectats.',
    es: 'Estrés, migrañas, fibromialgia y fatiga crónica: reflexología, naturopatía y gestión emocional, porque el cuerpo y las emociones están conectados.',
    en: 'Stress, migraines, fibromyalgia and chronic fatigue: reflexology, naturopathy and emotional wellbeing work, because body and emotions are connected.',
    fr: 'Stress, migraines, fibromyalgie et fatigue chronique : réflexologie, naturopathie et gestion des émotions, parce que le corps et les émotions sont liés.'
  }
};
