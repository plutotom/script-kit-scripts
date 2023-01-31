// .kenv/kenvs/plutotom/scripts/bible-search.ts
import "@johnlindquist/kit";
var bibleAPIHeaders = {
  "x-rapidapi-host": "ajith-holy-bible.p.rapidapi.com",
  "x-rapidapi-key": "08fb250872msh61199006cfd5075p1455c9jsn3e783f6773e5"
};
async function getBibleVerse(book, chapter, verse) {
  const query = `https://ajith-holy-bible.p.rapidapi.com/GetVerseOfaChapter?Book=${book}&Chapter=${chapter}&Verse=${verse}`;
  return await get(query, {
    headers: {
      ...bibleAPIHeaders
    }
  });
}
function parseVerses(verses) {
  if (Boolean(verses) && verses.includes("-")) {
    const list = [];
    const lowEnd = Number(verses.split("-")[0]);
    const highEnd = Number(verses.split("-")[1]);
    for (let i = lowEnd; i <= highEnd; i++) {
      list.push(i);
    }
    return list;
  } else if (Boolean(verses) && verses.includes(",")) {
    const list = verses.split(",").map((item) => Number(item));
    return list;
  } else if (Boolean(verses)) {
    return [Number(verses)];
  } else {
    throw new Error();
  }
}
function parseScripture(input) {
  const text = input.trim();
  if (text === "")
    throw new Error();
  else if (!text.includes(":"))
    throw new Error();
  let chapter = text.split(":")[0];
  const verses = text.split(":")[1];
  if (!chapter || !verses || chapter === " " || verses === "")
    throw new Error();
  chapter = Number(chapter);
  const verseList = parseVerses(verses);
  if (Boolean(verseList.length > 0)) {
    return verseList.map((item) => ({
      chapter,
      verse: item
    }));
  } else
    return [];
}
async function getScriptureResponseList(book, versObj, chapterVerseString) {
  let textList = [];
  for (let i = 0; i < versObj.length; i++) {
    const api = await getBibleVerse(book, versObj[i].chapter, versObj[i].verse);
    textList.push(`${versObj[i].verse}.${api.data.Output}`);
  }
  const textString = textList.join("\n");
  return [
    {
      name: `${book} ${chapterVerseString}`,
      description: `${textString.substring(0, 100)}...`,
      preview: textString,
      value: `# ${book} ${chapterVerseString}

${textString}`
    },
    {
      name: `End Search ?`,
      description: ``,
      value: "n"
    }
  ];
}
while (true) {
  try {
    const book = await arg("Which Book?", prepBookList());
    const chapterVerseString = await arg("Enter chapter verse [ch:verse]");
    if (chapterVerseString === "")
      throw new Error();
    const versObj = parseScripture(chapterVerseString);
    const textResponse = await arg(
      `Scripture (NIV)...`,
      await getScriptureResponseList(book, versObj, chapterVerseString)
    );
    if (textResponse === "n")
      break;
    else
      copy(textResponse);
  } catch (err) {
    const yesOrNo = await arg(`📖 Unable to find scripture, try again [y/n]?`);
    if (yesOrNo !== "y")
      break;
  }
}
function prepBookList() {
  return [
    {
      name: "📜 Genesis",
      description: `Old Testament - Frist book of the Pentateuch. 
                          Describes the creation; history of the old world`,
      value: "Genesis"
    },
    {
      name: "📜 Exodus",
      description: `Old Testament - Second book of the Pentateuch. 
                          Israel's departure from Egypt; the giving of the law; the tabernacle.`,
      value: "Exodus"
    },
    {
      name: "📜 Leviticus",
      description: `Old Testament - Third book of the Pentateuch.
                          The ceremonial law.`,
      value: "Leviticus"
    },
    {
      name: "📜 Numbers",
      description: `Old Testament - Fourth book of the Pentateuch.
                          The census of the people; the story of the wanderings in the wilderness.`,
      value: "Numbers"
    },
    {
      name: "📜 Deuteronomy",
      description: `Old Testament - Fifth book of the Pentateuch.
                          The law rehearsed; the death of Moses.`,
      value: "Deuteronomy"
    },
    {
      name: "📜 Joshua",
      description: `Old Testament - The story of the conquest and partition of Canaan.`,
      value: "Joshua"
    },
    {
      name: "📜 Judges",
      description: `Old Testament - The history of the nation from Joshua to Samson.`,
      value: "Judges"
    },
    {
      name: "📜 Ruth",
      description: `Old Testament - The story of the ancestors of the royal family of Judah.`,
      value: "Ruth"
    },
    {
      name: "📜 1 Samuel",
      description: `Old Testament - The story of the nation during the 
                            judgeship of Samuel and the reign of Saul.`,
      value: "1 Samuel"
    },
    {
      name: "📜 2 Samuel",
      description: `Old Testament - Story of the reign of David.`,
      value: "2 Samuel"
    },
    {
      name: "📜 1 Kings",
      description: `Old Testament - exclusive of the reigns of Saul and David.`,
      value: "1 Kings"
    },
    {
      name: "📜 2 Kings",
      description: `Old Testament - they comprehend the whole time of the Israelitish monarchy.`,
      value: "2 Kings"
    },
    {
      name: "📜 1 Chronicles",
      description: `Old Testament - they are the official histories of the kingdoms of Judah & Israel.`,
      value: "1 Chronicles"
    },
    {
      name: "📜 2 Chronicles",
      description: `Old Testament - they are the official histories of the kingdoms of Judah & Israel.`,
      value: "2 Chronicles"
    },
    {
      name: "📜 Ezra",
      description: `Old Testament - The story of the return of the Jews from the Babylonish captivity, 
                            and of the rebuilding of the temple.`,
      value: "Ezra"
    },
    {
      name: "📜 Nehemiah",
      description: `Old Testament - A further account of the rebuilding of the temple and city, 
                            and of the obstacles encountered and overcome.`,
      value: "Nehemiah"
    },
    {
      name: "📜 Esther",
      description: `Old Testament - The story of a Jewess who becomes queen of Persia.`,
      value: "Esther"
    },
    {
      name: "📜 Job",
      description: `Old Testament - The story of the trials and patience of a holy man of Edom.`,
      value: "Job"
    },
    {
      name: "📜 Psalms",
      description: `Old Testament - A collection of sacred poems intended 
                            for use in the worship of Jehovah. 
                            Chiefly the productions of David.`,
      value: "Psalms"
    },
    {
      name: "📜 Proverbs",
      description: `Old Testament - The wise sayings of Solomon.`,
      value: "Proverbs"
    },
    {
      name: "📜 Ecclesiastes",
      description: `Old Testament - A poem respecting the vanity of earthly things.`,
      value: "Ecclesiastes"
    },
    {
      name: "📜 Song of Solomon",
      description: `Old Testament - An allegory relating to the church.`,
      value: "Song of Solomon"
    },
    {
      name: "📜 Isaiah",
      description: `Old Testament - Prophecies respecting Christ and his kingdom.`,
      value: "Isaiah"
    },
    {
      name: "📜 Jeremiah",
      description: `Old Testament - Prophecies announcing the captivity of Judah, its sufferings, 
                            and the final overthrow of its enemies.`,
      value: "Jeremiah"
    },
    {
      name: "📜 Lamentations",
      description: `Old Testament - The utterance of Jeremiah's sorrow upon the capture of 
                            Jerusalem and the destruction of the temple.`,
      value: "Lamentations"
    },
    {
      name: "📜 Ezekiel",
      description: `Old Testament - Messages of warning and comfort to the Jews in their captivity.`,
      value: "Ezekiel"
    },
    {
      name: "📜 Daniel",
      description: `Old Testament - A narrative of some of the occurrences of 
                            the captivity, and a series of prophecies concerning Christ.`,
      value: "Daniel"
    },
    {
      name: "📜 Hosea",
      description: `Old Testament - Prophecies relating to Christ and the latter days.`,
      value: "Hosea"
    },
    {
      name: "📜 Joel",
      description: `Old Testament - Prediction of woes upon Judah,`,
      value: "Joel"
    },
    {
      name: "📜 Amos",
      description: `Old Testament - Prediction that Israel and other neighboring 
                        nations will be punished by conquerors from the north`,
      value: "Amos"
    },
    {
      name: "📜 Obadiah",
      description: `Old Testament - Prediction of the desolation of Edom.`,
      value: "Obadiah"
    },
    {
      name: "📜 Jonah",
      description: `Old Testament - Prophecies relating to Nineveh.`,
      value: "Jonah"
    },
    {
      name: "📜 Micah",
      description: `Old Testament - Predictions relating to the invasions of 
                            Shalmaneser and Sennacherib, the Babylonish captivity.`,
      value: "Micah"
    },
    {
      name: "📜 Nahum",
      description: `Old Testament - Prediction of the downfall of Assyria.`,
      value: "Nahum"
    },
    {
      name: "📜 Habakkuk",
      description: `Old Testament - A prediction of the doom of the Chaldeans.`,
      value: "Habakkuk"
    },
    {
      name: "📜 Zephaniah",
      description: `Old Testament - A prediction of the overthrow of Judah for 
                            its idolatry and wickedness.`,
      value: "Zephaniah"
    },
    {
      name: "📜 Haggai",
      description: `Old Testament - Prophecies concerning the rebuilding of the temple.`,
      value: "Haggai"
    },
    {
      name: "📜 Zechariah",
      description: `Old Testament - Prophecies relating to the rebuilding of the temple and the Messiah.`,
      value: "Zechariah"
    },
    {
      name: "📜 Malachi",
      description: `Old Testament - Prophecies relating to the calling of the Gentiles 
                                and the coming of Christ.`,
      value: "Malachi"
    },
    {
      name: "📜 Matthew",
      description: `New Testament - First of the four gospels, A brief history of the life of Christ.`,
      value: "Matthew"
    },
    {
      name: "📜 Mark",
      description: `New Testament - Second of the four gospels, incluses incidents omitted by St. Matthew.`,
      value: "Mark"
    },
    {
      name: "📜 Luke",
      description: `New Testament - Third of the four gospels, especial reference 
                        to His most important acts and discourses.`,
      value: "Luke"
    },
    {
      name: "📜 John",
      description: `New Testament - Fourth of the four gospels, The life of Christ, 
                            giving important discourses not related by the other evangelists.`,
      value: "John"
    },
    {
      name: "📜 Acts (of the Apostles)",
      description: `New Testament - The history of the labors of the apostles and 
                                of the foundation of the Christian Church.`,
      value: "Acts"
    },
    {
      name: "📜 Romans",
      description: `New Testament - A treatise by St. Paul on the doctrine of justification by Christ.`,
      value: "Romans"
    },
    {
      name: "📜 1 Corinthians",
      description: `New Testament - A letter from St. Paul to the Corinthians, correcting 
                                errors into which they had fallen.`,
      value: "1 Corinthians"
    },
    {
      name: "📜 2 Corinthians",
      description: `New Testament - St. Paul confirms his disciples in their faith, 
                                and vindicates his own character.`,
      value: "2 Corinthians"
    },
    {
      name: "📜 Galatians",
      description: `New Testament - St. Paul maintains that we are justified by faith, and not by rites.`,
      value: "Galatians"
    },
    {
      name: "📜 Ephesians",
      description: `New Testament - A treatise by St. Paul on the power of divine grace.`,
      value: "Ephesians"
    },
    {
      name: "📜 Philippians",
      description: `New Testament - St. Paul sets forth the beauty of Christian kindness.`,
      value: "Philippians"
    },
    {
      name: "📜 Colossians",
      description: `New Testament - St. Paul warns his disciples against errors, and exhorts to certain duties.`,
      value: "Colossians"
    },
    {
      name: "📜 1 Thessalonians",
      description: `New Testament - St. Paul exhorts his disciples to continue in 
                            the faith and in holy conversation.`,
      value: "1 Thessalonians"
    },
    {
      name: "📜 2 Thessalonians",
      description: `New Testament - St. Paul corrects an error concerning the speedy 
                            coming of Christ the second time.`,
      value: "2 Thessalonians"
    },
    {
      name: "📜 1 Timothy",
      description: `New Testament - St. Paul instructs Timothy in the duty of a pastor, 
                            and encourages him in the work of the ministry.`,
      value: "1 Timothy"
    },
    {
      name: "📜 2 Timothy",
      description: `New Testament - St. Paul instructs Timothy in the duty of a pastor, 
                            and encourages him in the work of the ministry.`,
      value: "2 Timothy"
    },
    {
      name: "📜 Titus",
      description: `New Testament - Epistle to Titus. St. Paul encourages Titus in the 
                            performance of his ministerial duties.`,
      value: "Titus"
    },
    {
      name: "📜 Philemon",
      description: `New Testament - An appeal to a converted master to receive a converted 
                            escaped slave with kindness.`,
      value: "Philemon"
    },
    {
      name: "📜 Hebrews",
      description: `New Testament - St. Paul maintains that Christ is the substance of the ceremonial law.`,
      value: "Hebrews"
    },
    {
      name: "📜 James",
      description: `New Testament - A treatise on the efficacy of faith united with good works.`,
      value: "James"
    },
    {
      name: "📜 1 Peter",
      description: `New Testament - Exhortations to a Christian life, with various warnings and predictions.`,
      value: "1 Peter"
    },
    {
      name: "📜 2 Peter",
      description: `New Testament - Exhortations to a Christian life, with various warnings and predictions.`,
      value: "2 Peter"
    },
    {
      name: "📜 1 John",
      description: `New Testament - Respecting the person of our Lord, and an 
                            exhortation to Christian love and conduct.`,
      value: "1 John"
    },
    {
      name: "📜 2 John",
      description: `New Testament - St. John warns a converted lady against false teachers.`,
      value: "2 John"
    },
    {
      name: "📜 3 John",
      description: `New Testament - A letter to Gaius, praising him for his hospitality.`,
      value: "3 John"
    },
    {
      name: "📜 Jude",
      description: `New Testament - Epistle of St. Jude.
                          Warnings against deceivers.`,
      value: "Jude"
    },
    {
      name: "📜 Revelation",
      description: `New Testament - Final book in the Bible.
                          The future of the Church foretold.`,
      value: "Revelation"
    }
  ];
}
