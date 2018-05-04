"use strict";

const log4js = require('log4js');
const logger = log4js.getLogger();
//const moment = require('moment');

const PREFIX = "faq-";
var PREFIXQ = "faq-q-";

var cache = require('persistent-cache');
var cats = cache({base: 'faq'});

module.exports = {
  getByName: (name) => {
    var faq = {
      name: name
    }
    if( name != null && name.length>0 ) {
      logger.info("CEC: getById ="+name);
      
    }
    return faq;
  },
  /*getAvailableFAQLists: () => {
    return cats.keysSync();
  },
  getFAQs: (name) => {
    var faqs = cats.getSync(PREFIX+name);
    logger.info("FAQ: GET ="+PREFIX+name);
    logger.info("FAQ: GET ="+JSON.stringify(faqs));
    return faqs;
  },
  answerFor: (name, question) => {
    var faq = getFAQForQuestion(name, question);
    if( faq && faq.answer ) {
      return faq.answer;
    } else {
      return null;
    }
  },
  faqsByCategory: (name, category) => {
    var faqs = cats.getSync(PREFIX+name);
    var faqArray = [];
    for( var fidx in faqs ) {
      var faq = faqs[fidx];
      if( faq.category == category ) {
        faqArray.push(faq);
      }
    }
    return faqArray;
  },
  addFaq: (name, faq) => {
    var faqs = cats.getSync(PREFIX+name);
    var newFaq = {"Error adding FAQ":"request should include 'question', 'answer', 'actions' and 'category'."};
    if( faq.question && faq.answer && faq.actions && faq.category ) {
      newFaq = {
        "question": faq.question,
        "answer": faq.answer,
        "actions": faq.actions,
        "category": faq.category
      }
      faqs.push(newFaq);
      cats.putSync(PREFIX+name, faqs);
      buildQlist(name);
    } else {
      logger.info("Error adding FAQ.  faq="+faq);
    }
    return newFaq;
  }*/
};
/*
function getFAQQuestions(name) {
  var qs = cats.getSync(PREFIXQ+name);
  if( qs==null ) {
    qs = buildQlist(name);
  }
  return qs;
}*/
