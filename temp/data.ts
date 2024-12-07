export type WordTS = {
  translation: string;
  correct: number;
  wrong: number;
  memoriStatus: number;
};

export type WordsTS = {
  [key: string]: WordTS;
};

export type ListTS = {
  order: number;
  gameCount: number;
  words: WordsTS;
};

export type ListsTS = {
  [key: string]: ListTS;
};

export type DataTS = {
  id: number;
  lists: ListsTS;
};

export const data: DataTS = {
  id: 0,
  lists: {
    list1: {
      order: 0,
      gameCount: 40,
      words: {
        chair: {
          translation: 'стул',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        clock: {
          translation: 'часы',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        shoe: {
          translation: 'туфля',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        cup: {
          translation: 'чашка',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        key: {
          translation: 'ключ',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        garden: {
          translation: 'сад',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        phone: {
          translation: 'телефон',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        bread: {
          translation: 'хлеб',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        pencil: {
          translation: 'карандаш',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        house: {
          translation: 'дом',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        pen: {
          translation: 'ручка',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        sky: {
          translation: 'небо',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        table: {
          translation: 'стол',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        watermelon: {
          translation: 'арбуз',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        bird: {
          translation: 'птица',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        mountain: {
          translation: 'гора',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        book: {
          translation: 'книга',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        window: {
          translation: 'окно',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        lamp: {
          translation: 'лампа',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        cat: {
          translation: 'кот',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        dog: {
          translation: 'собака',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        sun: {
          translation: 'солнце',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        moon: {
          translation: 'луна',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        tree: {
          translation: 'дерево',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        river: {
          translation: 'река',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
      },
    },
    test2: {
      order: 1,
      gameCount: 66,
      words: {
        apple: {
          translation: 'яблоко',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        book: {
          translation: 'книга',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        cat: {
          translation: 'кот',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        dog: {
          translation: 'собака',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
      },
    },
    '4inazes3': {
      order: 2,
      gameCount: 24,
      words: {
        car: {
          translation: 'автомобиль',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        banana: {
          translation: 'банан',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        flower: {
          translation: 'цветок',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
      },
    },
    'random words4': {
      order: 3,
      gameCount: 32,
      words: {
        sun: {
          translation: 'солнце',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        moon: {
          translation: 'луна',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        tree: {
          translation: 'дерево',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        river: {
          translation: 'река',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
      },
    },
    list5: {
      order: 4,
      gameCount: 18,
      words: {
        car: {
          translation: 'машина',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        house: {
          translation: 'дом',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        computer: {
          translation: 'компьютер',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        flower: {
          translation: 'цветок',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
      },
    },
    list6: {
      order: 5,
      gameCount: 35,
      words: {
        chair: {
          translation: 'стул',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        clock: {
          translation: 'часы',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        shoe: {
          translation: 'туфля',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        cup: {
          translation: 'чашка',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
      },
    },
    list7: {
      order: 6,
      gameCount: 40,
      words: {
        key: {
          translation: 'ключ',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        garden: {
          translation: 'сад',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        phone: {
          translation: 'телефон',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        bread: {
          translation: 'хлеб',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        pencil: {
          translation: 'карандаш',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        house: {
          translation: 'дом',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
      },
    },
    list8: {
      order: 7,
      gameCount: 40,
      words: {
        pen: {
          translation: 'ручка',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        sky: {
          translation: 'небо',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
      },
    },
    list9: {
      order: 8,
      gameCount: 40,
      words: {
        carrot: {
          translation: 'морковь',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        bicycle: {
          translation: 'велосипед',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        chair: {
          translation: 'стул',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        lamp: {
          translation: 'лампа',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        mirror: {
          translation: 'зеркало',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
      },
    },
    list10: {
      order: 9,
      gameCount: 40,
      words: {
        ball: {
          translation: 'мяч',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
      },
    },
    list11: {
      order: 10,
      gameCount: 40,
      words: {
        computer: {
          translation: 'компьютер',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        piano: {
          translation: 'пианино',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        cat: {
          translation: 'кот',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        guitar: {
          translation: 'гитара',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        book: {
          translation: 'книга',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        window: {
          translation: 'окно',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
      },
    },
    list12: {
      order: 11,
      gameCount: 40,
      words: {
        beach: {
          translation: 'пляж',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        bottle: {
          translation: 'бутылка',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        star: {
          translation: 'звезда',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        chair: {
          translation: 'стул',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        picture: {
          translation: 'картина',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        bed: {
          translation: 'кровать',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
        ocean: {
          translation: 'океан',
          correct: 0,
          wrong: 0,
          memoriStatus: 0,
        },
      },
    },
  },
};
