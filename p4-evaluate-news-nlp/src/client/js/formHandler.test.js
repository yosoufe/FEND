// for async/await tests
import 'regenerator-runtime/runtime'

// needed just for tests.
global.fetch = require("node-fetch");


test('client sentiment_analysis_get text', async function(){
  var formHandler = require('./formHandler');
  var response = await formHandler.sentiment_analysis_get("John is a fantastic engineer.", 'text');
  expect(Object.keys(response).length).not.toBe(0);
});

test('client sentiment_analysis_get url', async function(){
  var formHandler = require('./formHandler');
  var response = await formHandler.sentiment_analysis_get("https://levelup.gitconnected.com/different-ways-to-check-if-an-object-is-empty-in-javascript-e1252d1c0b34", 'url');
  expect(Object.keys(response).length).not.toBe(0);
});

test('client prepare results text', function(){
  var data = {
    polarity: 'neutral',
    subjectivity: 'subjective',
    text: 'some text',
    polarity_confidence: 0.7165546417236328,
    subjectivity_confidence: 0.9042594835354115
  };

  var formHandler = require('./formHandler');
  const prepareResultsText = formHandler.prepareResultsText;
  var resString = prepareResultsText(data);
  expect(resString).not.toBe("")
})

test('client prepare results url', function(){
  var data = {
    polarity: 'neutral',
    subjectivity: 'subjective',
    text: 'We provide a variety of Text Classification, Sentiment Analysis, Entity Extraction, and Summarization features that allow you to extract meaningful insight and understanding from textual content.\n' +
      '\n' +
      'The majority of our users will use one or more endpoints combined, depending on their use case. For example, for full coverage in entity extraction use cases we recommend combining the Entity Extraction and Concept Extraction features.\n' +
      '\n' +
      'Knowing the high-level semantic category of an unlabelled document such as a webpage or article can be extremely helpful in various applications. The Classification endpoint helps you categorize any text or URL according to a predefined taxonomy.\n' +
      '\n' +
      'Knowing the high-level semantic category of an unlabelled document such as a web page or article can be extremely helpful in different applications. The Classification by Taxonomy endpoint helps you categorize any text or URL according to various classification schemes and taxonomies (see the Taxonomies section below).\n' +
      '\n' +
      'Our Classification by Taxonomy endpoint is capable of classifying content according to multiple taxonomies which can be selected by adding the ID of the taxonomy to the end of the /classify endpoint. Below you can see a list of these taxonomies and their definitions, and you can search the labels for each taxonomy on our News API documentation here.\n' +
      '\n' +
      'We have standardized all our of our supported taxonomies into a tree-like structure, which allows you to easily traverse from child categories to parent categories, recursively.\n' +
      '\n' +
      'Each classification result contains an array of , which contains links to the current taxonomy label ( ) as well as its parent(s), if any ( ).\n' +
      '\n' +
      "To retrieve the entire taxonomy, you can simple remove the category ID from the end of the attribute, e.g.  sentiment from a piece of text such as a tweet, a review or an article can provide us with valuable insight about the author's emotions and perspective: whether the tone is positive, neutral or negative, and whether the text is subjective (meaning it's reflecting the author's opinion) or objective (meaning it's expressing a fact). Our Sentiment Analysis endpoint is built exactly for this purpose.\n" +
      '\n' +
      'The Entity-level Sentiment Analysis (ELSA) endpoint provides the sentiment associated with entity mentioned in a document.\n' +
      '\n' +
      'For every entity that is mentioned in a piece of text, ELSA will return:\n' +
      '\n' +
      'The ELSA endpoint is particularly useful for analyzing articles that reference multiple entities while expressing differing sentiments about each. You can use this to analyze how an entity is covered in a single document or across multiple documents.\n' +
      '\n' +
      'The endpoint accepts both text and urls as parameters, and the only language currently supported is English.\n' +
      '\n' +
      'Please note: as calls to the ELSA endpoint requires a significantly greater increased workload from the Text Analysis API, one call to the endpoint will count as three calls to your allowance.\n' +
      '\n' +
      "Certain types of documents, such as customer feedback or reviews, may contain fine-grained sentiment about different aspects of the entities (e.g. a product or service) that are mentioned in the document. For instance, a review about a hotel may contain opinionated sentences about its staff, beds and location. This information can be highly valuable for understanding customers' opinion about a particular service or product.\n" +
      '\n' +
      'Using the Aspect-based Sentiment Analysis (ABSA) endpoint you can retrieve a list of aspects that are mentioned in a document belonging to a specific domain, and the sentiment of the author towards each of those aspects.\n' +
      '\n' +
      'The following values corresponding to different domains are currently supported, and accepted for the parameter:\n' +
      '\n' +
      'The aspects returned for each domain are as follows:\n' +
      '\n' +
      'Documents often contain mentions of entities such as people, places, products and organizations, which we collectively call Named Entities. Additionally they may also contain specific values or items such as links, telephone numbers, email addresses, currency amounts and percentages. To extract these entities and values from a piece of text, as well as the keywords, you can use the Entity Extraction endpoint.\n' +
      '\n' +
      'Entity Extraction looks at the structural patterns in a document to find and extract entities, and therefore can be error-prone.\n' +
      '\n' +
      "The Concept Extraction endpoint extracts different types of notable entities from a document, using Wikipedia (and potentially other knowledge bases) as context. It also taps into Linked Open Data to provide structured data around the extracted entities, such as LOD URIs which can be used to retrieve additional information about an entity such as a person's height or a company's stock price, as well as semantic types of an entity (DBpedia, Schema.org, etc.) which can be used for filtering entities by their type.\n" +
      '\n' +
      "N.B. We recommend using both Entity and Concept Extraction together if you're looking to extract well-known entities with higher precision. See Entity Extraction.\n" +
      '\n' +
      'Under the hood, our Concept Extraction endpoint performs precise Named Entity Disambiguation to find out what exactly the author had in mind when mentioning a topic or entity. For instance, in the sentence "Apple was founded by Steve Jobs" does “apple” refer to the fruit or the company?\n' +
      '\n' +
      'Each concept can have one or more surface forms. Each surface form of a concept may occur one or more times in a body of text. Our API will only return the first occurrence of a surface form for a given concept. For example:\n' +
      '\n' +
      '“Apple reports record first quarter results. Apple says sales of iPhones have slowed.”\n' +
      '\n' +
      "is a surface form for concept . Even though it's appeared two times in the text, our API only annotates the first occurrence.\n" +
      '\n' +
      'However, in cases that different surface forms point to the same concept, our API will annotate all of those surface forms. For example:\n' +
      '\n' +
      '“The European migrant crisis or European refugee crisis began in 2015, when a rising number of refugees and migrants made the journey to the European Union to seek asylum, travelling across the Mediterranean Sea, or through Southeast Europe.”\n' +
      '\n' +
      'and are both surface forms of the concept and our API will return both in its results.\n' +
      '\n' +
      "Concepts can be sorted by several measures. Using API response it's easy to sort them using the attribute. Or filtering concepts which their surface forms' is higher than certain threshold. However, there are occasions where you wish to sort concepts by their relevance to the submitted article. One approach could be sorting them by sum of their weighed surface-forms based on whether they have surfaced in the title or body of the article.\n" +
      '\n' +
      'The Summarization endpoint provides an easy way of summarizing a document such as a news article or blog post into a few key sentences. You can specify the length of the summary via the or parameters.\n' +
      '\n' +
      "If you are dealing with webpages and articles, chances are the text you'd like to analyze is surrounded by some 'clutter' such as site navigation or ads. In order to get accurate results in your text analysis, you might want to remove such clutter and extract the main text of the webpage or article. Article Extraction allows you to do that, and in addition to removing clutter, also helps you extract the following information:\n" +
      '\n' +
      'The Image Tagging endpoint identifies common shapes, objects and concepts in an image and returns them as a list of tags along with a confidence score which indicates how confident the system is about the assignment.\n' +
      '\n' +
      'Hashtags have become a popular way of tagging content on Social Media, and attaching hashtags to a piece of content can dramatically increase its visibility on various Social Networking platforms such as Facebook, Twitter, Google+, Instagram and LinkedIn. Using Hashtag Suggestion, you can automatically generate a list of highly-relevant hashtags that will help you get more exposure for your content on Social Media.\n' +
      '\n' +
      'Language Detection detect the language of any text or URL swiftly and accurately, and returns it as an ISO 639-1 language code.\n' +
      '\n' +
      'Combined Calls allows you to perform multiple analysis operations on the same input (text or URL) with a single API call. This is a helper method with the benefit of saving your application from having to make multiple API calls, and can reduce the number of network round trips between your application and our servers, resulting in a lower overall analysis time.\n' +
      '\n' +
      'To use the Combined Calls endpoint you must supply the list of endpoints that you wish to be applied to your input. Currently the following endpoints are available:',
    polarity_confidence: 0.495248943567276,
    subjectivity_confidence: 1
  }

  var formHandler = require('./formHandler');
  const prepareResultsText = formHandler.prepareResultsText;
  var resString = prepareResultsText(data);
  expect(resString).not.toBe("")
})