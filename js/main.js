/*
В файле main.js напишите необходимые функции для создания массива из 25 сгенерированных объектов. Каждый объект массива — описание фотографии, опубликованной пользователем.
Структура каждого объекта должна быть следующей:

id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.

url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.

description, строка — описание фотографии. Описание придумайте самостоятельно.

likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.

comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:
{
  id: 135,
  avatar: 'img/avatar-6.svg',
  message: 'В целом всё неплохо. Но не всё.',
  name: 'Артём',
}

У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.

Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.

Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:

Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.*/

const PHOTO_ITEMS_NUMBER = 25;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

const DESCRIPTIONS = [
  'Самое красивое место',
  'Солнечное утро',
  'Необычный закат',
  'Тихая гладь озера',
  'Осенний лес',
  'Беззаботная пора',
  'Сама милота',
  'Самое красивое место',
  'Солнечное утро',
  'Необычный закат',
  'Тихая гладь озера',
  'Осенний лес',
  'Беззаботная пора',
  'Сама милота',
  'Самое красивое место',
  'Солнечное утро',
  'Необычный закат',
  'Тихая гладь озера',
  'Осенний лес',
  'Беззаботная пора',
  'Сама милота',
  'Самое красивое место',
  'Солнечное утро',
  'Необычный закат',
  'Тихая гладь озера',
  'Волшебный закат'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Татьяна',
  'Мария',
  'Владимир',
  'Виктор',
  'Юлия',
  'Петр',
  'Сергей',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getIndexIncrement () {
  let count = 0;
  return function () {
    return ++count;
  };
}

const commentCounter = getIndexIncrement();

const createComment = (index = commentCounter()) => ({
  id: `${index}`,
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR, MAX_AVATAR)}.svg`,
  message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const photoCounter = getIndexIncrement();

const createPhoto = (index = photoCounter()) => ({
  id: `${index}`,
  url: `photos/${index}.jpg`,
  description: DESCRIPTIONS[index],
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({ length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)},
    createComment)
});

const listPhotos = Array.from(
  { length: PHOTO_ITEMS_NUMBER },
  createPhoto
);

// eslint-disable-next-line no-console
console.log(listPhotos);
