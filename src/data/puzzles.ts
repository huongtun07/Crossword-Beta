import { CrosswordPuzzle } from '../types';

export const INITIAL_PUZZLES: CrosswordPuzzle[] = [
  {
    id: 'g6-unit1-school',
    title: 'Grade 6: My New School & Friends',
    grade: 'Grade6',
    gradeLabel: 'Lớp 6',
    topic: 'Trường học & Bạn bè',
    description: 'Khám phá các từ vựng về trường lớp, dụng cụ học tập và môn học.',
    secretKeyword: 'SCHOOL',
    secretKeywordClueVi: 'Nơi học sinh đến học tập, gặp gỡ thầy cô và bạn bè mỗi ngày (6 chữ cái).',
    secretKeywordClueEn: 'A place where students go to learn and make friends.',
    rows: [
      {
        id: 1,
        word: 'SUBJECT',
        keyLetterIndex: 0, // 'S'
        clueVi: 'Môn học ở trường (ví dụ: Toán, Văn, Tiếng Anh).',
        clueEn: 'Math, Science, and English are examples of a school ____.',
        ipa: '/ˈsʌb.dʒekt/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'My favorite ____ at school is English.'
      },
      {
        id: 2,
        word: 'TEACHER',
        keyLetterIndex: 3, // 'C'
        clueVi: 'Người dạy học và truyền kiến thức cho học sinh.',
        clueEn: 'The person who helps students learn in class.',
        ipa: '/ˈtiː.tʃər/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'Ms. Hoa is a very dedicated English ____.'
      },
      {
        id: 3,
        word: 'UNIFORM',
        keyLetterIndex: 4, // 'O'
        clueVi: 'Trang phục quy định học sinh mặc khi đến trường.',
        clueEn: 'Special clothes worn by all students at a school.',
        ipa: '/ˈjuː.nɪ.fɔːm/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'We wear our white shirt ____ on Mondays.'
      },
      {
        id: 4,
        word: 'COMPASS',
        keyLetterIndex: 0, // 'C'
        clueVi: 'Dụng cụ học tập dùng để vẽ hình tròn trong môn Toán.',
        clueEn: 'A tool used in Math class to draw circles.',
        ipa: '/ˈkʌm.pəs/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'Use your ____ to draw a perfect circle.'
      },
      {
        id: 5,
        word: 'LESSON',
        keyLetterIndex: 0, // 'L'
        clueVi: 'Bài học, tiết học trên lớp.',
        clueEn: 'A period of time in which students learn something with a teacher.',
        ipa: '/ˈles.ən/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'Pay attention during the history ____.'
      },
      {
        id: 6,
        word: 'ENGLISH',
        keyLetterIndex: 6, // 'H'
        clueVi: 'Môn Ngoại ngữ quốc tế phổ biến nhất thế giới.',
        clueEn: 'The global language we are learning in this game!',
        ipa: '/ˈɪŋ.ɡlɪʃ/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'Learning ____ opens up many future opportunities.'
      }
    ]
  },
  {
    id: 'g7-unit2-healthy',
    title: 'Grade 7: Healthy Living & Community',
    grade: 'Grade7',
    gradeLabel: 'Lớp 7',
    topic: 'Sống Khỏe & Cộng Đồng',
    description: 'Thử thách vốn từ vựng về lối sống lành mạnh, hoạt động thể thao và tình nguyện.',
    secretKeyword: 'HEALTH',
    secretKeywordClueVi: 'Tài sản quý giá nhất của con người (Có sức khỏe là có tất cả - 6 chữ cái).',
    secretKeywordClueEn: 'The condition of a person’s body and mind.',
    rows: [
      {
        id: 1,
        word: 'HABIT',
        keyLetterIndex: 0, // 'H'
        clueVi: 'Thói quen sinh hoạt hằng ngày (ví dụ: tập thể dục, đọc sách).',
        clueEn: 'Something you do regularly and repeatedly.',
        ipa: '/ˈhæb.ɪt/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'Washing your hands before eating is a good ____.'
      },
      {
        id: 2,
        word: 'ENERGY',
        keyLetterIndex: 0, // 'E'
        clueVi: 'Năng lượng dồi dào giúp cơ thể hoạt động bền bỉ.',
        clueEn: 'The power and strength to do physical or mental activity.',
        ipa: '/ˈen.ə.dʒi/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'Eating fresh vegetables gives you lots of ____.'
      },
      {
        id: 3,
        word: 'ACTIVE',
        keyLetterIndex: 0, // 'A'
        clueVi: 'Năng động, thường xuyên vận động thể chất.',
        clueEn: 'Always doing things, moving around, or taking part in sports.',
        ipa: '/ˈæk.tɪv/',
        partOfSpeech: 'Tính từ',
        exampleSentence: 'She plays badminton every afternoon to stay ____.'
      },
      {
        id: 4,
        word: 'CLEAN',
        keyLetterIndex: 1, // 'L'
        clueVi: 'Sạch sẻ, không bị ô nhiễm hay bẩn.',
        clueEn: 'Free from dirt, marks, or pollution.',
        ipa: '/kliːn/',
        partOfSpeech: 'Tính từ',
        exampleSentence: 'Keep your classroom ____ and tidy.'
      },
      {
        id: 5,
        word: 'THIRST',
        keyLetterIndex: 0, // 'T'
        clueVi: 'Cảm giác thèm uống nước khi cơ thể thiếu nước.',
        clueEn: 'The feeling of needing or wanting a drink.',
        ipa: '/θɜːst/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'Drink water to quench your ____ after playing soccer.'
      },
      {
        id: 6,
        word: 'HEALTHY',
        keyLetterIndex: 0, // 'H'
        clueVi: 'Mạnh khỏe, không bị ốm đau.',
        clueEn: 'In good physical or mental condition.',
        ipa: '/ˈhel.θi/',
        partOfSpeech: 'Tính từ',
        exampleSentence: 'A balanced diet helps you stay ____.'
      }
    ]
  },
  {
    id: 'g8-unit3-customs',
    title: 'Grade 8: Customs, Traditions & Countryside',
    grade: 'Grade8',
    gradeLabel: 'Lớp 8',
    topic: 'Phong Tục & Đời Sống Nông Thôn',
    description: 'Tìm hiểu phong tục tập quán, truyền thống văn hóa và đời sống vùng quê.',
    secretKeyword: 'CULTURE',
    secretKeywordClueVi: 'Bản sắc Văn Hóa của một dân tộc hay quốc gia (7 chữ cái).',
    secretKeywordClueEn: 'The arts, customs, beliefs, and traditions of a nation or group.',
    rows: [
      {
        id: 1,
        word: 'CUSTOM',
        keyLetterIndex: 0, // 'C'
        clueVi: 'Phong tục, tập quán lâu đời của một cộng đồng.',
        clueEn: 'A traditional and widely accepted way of behaving or doing something.',
        ipa: '/ˈkʌs.təm/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'It is a Vietnamese ____ to give lucky money during Tet.'
      },
      {
        id: 2,
        word: 'UNIQUE',
        keyLetterIndex: 0, // 'U'
        clueVi: 'Độc đáo, duy nhất, không giống nơi nào khác.',
        clueEn: 'Being the only one of its kind; unlike anything else.',
        ipa: '/juːˈniːk/',
        partOfSpeech: 'Tính từ',
        exampleSentence: 'Each ethnic group has its own ____ costume.'
      },
      {
        id: 3,
        word: 'LIFESTYLE',
        keyLetterIndex: 0, // 'L'
        clueVi: 'Lối sống, phong cách sống của con người.',
        clueEn: 'The way in which a person or group lives.',
        ipa: '/ˈlaɪf.staɪl/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'Country people often enjoy a peaceful ____.'
      },
      {
        id: 4,
        word: 'TRADITION',
        keyLetterIndex: 0, // 'T'
        clueVi: 'Truyền thống được truyền từ thế hệ này sang thế hệ khác.',
        clueEn: 'A custom or belief passed down from generation to generation.',
        ipa: '/trəˈdɪʃ.ən/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'Making Banh Chung is an essential Tet ____.'
      },
      {
        id: 5,
        word: 'ETHNIC',
        keyLetterIndex: 4, // 'C'
        clueVi: 'Thuộc về dân tộc (ví dụ: Việt Nam có 54 dân tộc).',
        clueEn: 'Relating to a population subgroup with a common national or cultural tradition.',
        ipa: '/ˈeθ.nɪk/',
        partOfSpeech: 'Tính từ',
        exampleSentence: 'Vietnam has 54 different ____ groups.'
      },
      {
        id: 6,
        word: 'RESPECT',
        keyLetterIndex: 0, // 'R'
        clueVi: 'Sự tôn trọng, kính trọng người lớn tuổi và văn hóa.',
        clueEn: 'A feeling of deep admiration for someone or something.',
        ipa: '/rɪˈspekt/',
        partOfSpeech: 'Danh từ / Động từ',
        exampleSentence: 'Younger people should show ____ to elders.'
      },
      {
        id: 7,
        word: 'HERITAGE',
        keyLetterIndex: 1, // 'E'
        clueVi: 'Di sản văn hóa hoặc thiên nhiên quý giá.',
        clueEn: 'Valued objects and qualities such as historic buildings and cultural traditions.',
        ipa: '/ˈher.ɪ.tɪdʒ/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'Ha Long Bay is a UNESCO World ____ site.'
      }
    ]
  },
  {
    id: 'g9-unit4-wonders',
    title: 'Grade 9: Wonders of Vietnam & Global English',
    grade: 'Grade9',
    gradeLabel: 'Lớp 9',
    topic: 'Kỳ Quan Việt Nam & Tiếng Anh Toàn Cầu',
    description: 'Khám phá các kỳ quan thiên nhiên, danh lam thắng cảnh và kỹ năng hội nhập.',
    secretKeyword: 'WONDERS',
    secretKeywordClueVi: 'Các Kỳ Quan thiên nhiên và công trình kiến trúc tuyệt mỹ (7 chữ cái).',
    secretKeywordClueEn: 'Things or places that cause feelings of wonder and admiration.',
    rows: [
      {
        id: 1,
        word: 'WORLD',
        keyLetterIndex: 0, // 'W'
        clueVi: 'Thế giới bao la nơi chúng ta đang sống.',
        clueEn: 'The earth, together with all of its countries and people.',
        ipa: '/wɜːld/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'English is spoken all over the ____.'
      },
      {
        id: 2,
        word: 'OCEAN',
        keyLetterIndex: 0, // 'O'
        clueVi: 'Đại dương bao la phủ phần lớn bề mặt Trái Đất.',
        clueEn: 'A very large expanse of sea.',
        ipa: '/ˈəʊ.ʃən/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'The Pacific is the largest ____ on Earth.'
      },
      {
        id: 3,
        word: 'NATURE',
        keyLetterIndex: 0, // 'N'
        clueVi: 'Thiên nhiên tươi đẹp với rừng, sông, núi, cây cối.',
        clueEn: 'All the animals, plants, rocks, and weather in the world.',
        ipa: '/ˈneɪ.tʃər/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'We must protect ____ from pollution.'
      },
      {
        id: 4,
        word: 'DESTINATION',
        keyLetterIndex: 0, // 'D'
        clueVi: 'Điểm đến trong một chuyến du lịch hay hành trình.',
        clueEn: 'The place to which someone or something is going or being sent.',
        ipa: '/ˌdes.tɪˈneɪ.ʃən/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'Hoi An is a popular tourist ____ in Vietnam.'
      },
      {
        id: 5,
        word: 'EXPLORE',
        keyLetterIndex: 0, // 'E'
        clueVi: 'Khám phá, thám hiểm những vùng đất mới.',
        clueEn: 'To travel through an unfamiliar area in order to learn about it.',
        ipa: '/ɪkˈsplɔːr/',
        partOfSpeech: 'Động từ',
        exampleSentence: 'Tourists love to ____ Phong Nha cave.'
      },
      {
        id: 6,
        word: 'RESORT',
        keyLetterIndex: 0, // 'R'
        clueVi: 'Khu nghỉ dưỡng cao cấp dành cho du khách.',
        clueEn: 'A place used for relaxation or holidays.',
        ipa: '/rɪˈzɔːt/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'They stayed at a luxury beach ____ in Phu Quoc.'
      },
      {
        id: 7,
        word: 'SUNSHINE',
        keyLetterIndex: 0, // 'S'
        clueVi: 'Ánh nắng mặt trời ấm áp rực rỡ.',
        clueEn: 'Direct sunlight unbroken by cloud.',
        ipa: '/ˈsʌn.ʃaɪn/',
        partOfSpeech: 'Danh từ',
        exampleSentence: 'Da Nang is famous for its warm ____ and sandy beaches.'
      }
    ]
  }
];
