exports.seed = async function (knex) {
  try {
    // Deletes ALL existing entries
    await knex('albums').del()
    // Inserts seed entries
    await knex('albums').insert([{
        "id": 76054,
        "game_id": 11800,
        "category": "Game",
        "classification": "Original Soundtrack",
        "name": "Divinity: Original Sin II Original Soundtrack",
        "notes": "Composer / Music Director: Borislav Slavov\nLead Audio: Christian Pacaud\nTracks 01~13, 15~42 composed by Borislav Slavov\nTrack 14 \"Power of Innocence 2017 (Orchestral Version)\" originally composed by Kirill Pokrovsky, produced by Borislav Slavov\nOrchestra Recorded at Tom-Tom Studio, Budapest\nRecording Engineer: Tamas Kurina\nOrchestra: Hungarian Studio Orchestra\nConductor: Peter Pejtsik\nOrchestrator, Additional Music: Victor Stoyanov\nOrchestrator, Additional Arrangements: Georgi Andreev\nAccordion and Various Woodwind Instruments: Dimitar Tishev\nUd and Various Stringed Instruments: Ivaylo Petrov\nStringed Instruments: Petar Milanov\nFeatured Musician, Additional Music: Sildar Borisov\nFlute and Various Woodwind Instruments: Ivo Paunov\nCello: Stoyan Bozhkov\nViolin: Ivaylo Danailov, Tzvetina Ilieva\nSingers: Darina Dzhambazova, Desislava Petrova, Ivelina Dimova, Milena Stavreva, Milena Tsolova, Neli Petkova, Tanya Miteva, Yulia Kavroshilova\nAsian samples courtesy of Spectrasonics Heart of Asia\nOrchestral samples included in this recording from the Vienna Symphonic Library\n\"Divine's Lament\"\nLead vocals by Borislav Slavov",
        "game_name": "Divinity: Original Sin II",
        "release_date": "2018-03-23"
      },
      {
        "id": 44019,
        "game_id": 386,
        "category": "Game",
        "classification": "Original Soundtrack, Vocal",
        "game_name": "Final Fantasy XIV",
        "name": "A REALM REBORN: FINAL FANTASY XIV Original Soundtrack",
        "notes": "Compose:\nMasayoshi Soken (001~009, 011, 013, 016~024, 026~028, 031~037, 039~041, 045~048, 050~055, 057~061, 063~077, 079~095, 102~119)\nNobuo Uematsu (010, 038, 042, 044, 078, 096, 097)\nMasayoshi Soken, Film Score (012, 014, 015, 025, 049, 056, 098~101)\nNaoshi Mizuta (029, 062)\nTsuyoshi Sekito (030)\nFilm Score (043)\nArrange:\nMasayoshi Soken, Film Score (001, 002, 004, 005, 115)\nFilm Score (003, 011, 012, 014~018, 020, 023, 025~027, 031, 043, 049, 056, 068, 080, 094, 098~101, 104, 107, 110, 112~114, 116, 117, 119)\nMasayoshi Soken (006~009, 013, 019, 021, 022, 024, 028, 032~037, 039~042, 045~048, 050~055, 057~061, 063~067, 069~077, 079, 081~093, 102, 103, 105, 106, 108, 109, 111, 118)\nTsutomu Narita (010, 038, 044, 078, 096)\nNaoshi Mizuta (029, 062, 097)\nTsuyoshi Sekito (030, 095)\n--------------\nProducer & Director: Naoki Yoshida\nAssistant Directors: Hiroshi Takai & Kazuya Niinou\nLead Artist: Akihiko Yoshida\nLead UI Artist: Hiroshi Minagawa\nLead Designer: Takeo Suzuki\nTechnical Director: Yoshihisa Hashimoto\nLead Programmer: Hideyuki Kasuga\nLead Game Designer: Nobuaki Komoto\nBattle System Director: Akihiko Matsui\nLead Battle System Designer: Mitsutoshi Gondai\nMain Scenario Writer: Kazutoyo Maehiro\nWorld Lore Creator: Banri Oda\nTitle Logo Designer & Image Illustrator: Yoshitaka Amano\nSound Director & Composer: Masayoshi Soken\nComposers: Nobuo Uematsu, Naoshi Mizuta & Tsuyoshi Sekito\nArrangement & Synthesizer Programming: Tsutomu Narita\nArrangement & Orchestration: Nobuko Toda & Yoshitaka Suzuki (Film Score)\nTrack Title Named by: Michael-Christopher Koji Fox & Banri Oda\nSound Designers:\nMakoto Ise, Go Kinuya, Yosuke Nakashima, Atsushi Ohnishi & Minoru Tsuchihashi\nAudio Programmers:\nYoshinori Tsuchida, Akihiro Minami, Yuichi Nishimatsu & Hikaru Taniyama\nProject Manager: Kazuki Hamamoto\nProject Assistants: Shihoko Karube & Yuko Sakae\nLyrics and Vocals: Michael-Christopher Koji Fox\nLatin Translation: Eva Kappeller\nVocals: Michael-Christopher Koji Fox, Fukiko Sekine [Tr.076 & Tr.082] & Yuriko Nagata [Tr.090]\nChorus: Akane Ikeya [Tr.069] & Music Creation (Isamu Isizuka, Yuri Kasahara, Nobuyuki Katou, Kazuhiro Komiya, Takahiko Kumagai, Takahiro Nagai, Atsuko Okawa, Etsuyo Ota, Tamami Shiraishi, Sin Sugie)\nMusician Coordinator: Yoshihito Ohokubo\nMastering Engineer: Yasuji Yasman Maeda (Bernie Grundman Mastering)\nBD Authoring Engineers: Sawako Ryuko & Makoto Tonosu (Bernie Grundman Mastering)\nBooking Manager: Mashiho Narita (Bernie Grundman Mastering)\nMastering & Authoring Studio: Bernie Grundman Mastering\nArt Director & Designer: Takaaki Inoue\nPackage Coordinator: Isao Kobayashi (Sony Music Communication Inc.)\nProduction Manager: Yasuhiro Takamatsu\nProduction Directors:\nSoshi Yoshida, Hideki Umezu & Kai Ishikawa\nProduction Assistant: Nozomi Miyazawa\nProduction Desks: Yuka Kato, Tomomi Matsuo & Yui Yasutomi\nPromotion Director: Akio Shiraishi\nDivision Executive: Izumi Tsukushi\nCorporate Executive: Shinji Hashimoto\nExecutive Vice President: Keiji Honda\nSpecial Thanks:\nHiroki Ogawa (Dog Ear Records)\nChiho Sekiguchi (Dog Ear Records)\nKensuke Matsushita (Dog Ear Records)\nReiko Uematsu (SMILE PLEASE)\nShinichi Fujita, Tomoyuki Izumida, Hisashi Yoshimura, Naomichi Tomita, Hiromasa Ooyabu & Yoshinobu Usui (SONY DADC)\nThe FINAL FANTASY XIV Development Staff & YOU!\nPresented by SQUARE ENIX CO., LTD. http://soundtrack.jp.square-enix.com/",
        "release_date": "2014-03-26"
      },
      {
        "id": 68351,
        "game_id": 2963,
        "category": "Game",
        "classification": "Original Soundtrack",
        "game_name": "Dota 2",
        "name": "The DOTA 2 Official Soundtrack",
        "notes": "Packaged in a digisleeve without a plastic CD tray.\n01-08, 18\nComposed by Jason Hayes / Tim Larkin\nPerformed by Northwest Sinfonia / Valve Studio Orchestra\nOrchestration / conducted by Timothy Williams\n09-11\nComposed by Chance Thomas\nPerformed by Utah Film Orchestra / Salt Lake Choral Artists\nConcert Master - Aaron Ashton\nPrincipal 2nd Violin - David Langr\nPrincipal Viola - Leslie Harlow\nPrincipal Cello - Nicole Pinnell\nPrincipal Trumpet – Joe Reardon\nPrincipal Horn - Kenji Hood\nPrincipal Trombone - Bryan Hofheins\nConductors - Judd Maher and Chance Thomas\n12-14\nComposed by Jeremy Soule / Julian Soule\n15-17\nComposed by Lennie Moore\nMixed by Brian Lee White",
        "release_date": "2017-07-28"
      }
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};