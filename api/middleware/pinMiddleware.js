function convertForDB(req, res, next) {
  let makerOrTag = req.body.maker ? req.body.maker : req.body.tag_name;

  const lowerCaseMaker = makerOrTag.toLowerCase();
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
  if(req.body.maker){
      req.body.maker = saveToDB
  } else {
      req.body.tag_name = saveToDB
  }
  
  next();
}

function checkIfPinExists(){}

function noPinDupes(){}

function checkIfTagExists(){}

function noTagDupes(){}




module.exports = {
  convertForDB,
};
