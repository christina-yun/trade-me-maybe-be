function convertForDB(req, res, next) {
  const lowerCaseMaker = req.body.maker.toLowerCase();
  let saveToDB = "";
  let i = 0;

  while (i < lowerCaseMaker.length) {
    if (lowerCaseMaker[i] === " ") {
      saveToDB += "-";
    } else {
      saveToDB += lowerCaseMaker[i];
    }
    i++;
  }
  req.body.maker = saveToDB;
  next();
}

module.exports = {
  convertForDB,
};
