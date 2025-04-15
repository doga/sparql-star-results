import { 
  dataFactory as t, 
  datasetFactory as rdf,
  // iri,
} from "./deps.mjs";



/**
 * Translates an RDF dataset into JSONable SPARQL-Star query results.
 *
 * @param {Dataset}
 * @returns {object} sparqlQueryResults
 * @throws {TypeError} 
 * @see {@link https://rdf4j.org/documentation/programming/rdfstar/#extended-sparql-json-format|RDF4J's Extended JSON format for SPARQL-Star query results}
 * @see {@link https://www.w3.org/TR/sparql11-results-json/|SPARQL 1.1 Query Results JSON Format}
 * @see {@link https://rdf.js.org/dataset-spec/#dataset-interface|Dataset interface}
 */
function fromDataset(dataset) {
  
}

export {fromDataset};
