import { 
  dataFactory as t, 
  datasetFactory as rdf,
  // iri,
} from "./deps.mjs";


/**
 * Parses JSONable SPARQL-Star query results and produces an RDF dataset.
 * Suitable for parsing the results of CONSTRUCT (and possibly DESCRIBE) queries but not SELECT queries.
 *
 * @param {object} sparqlQueryResults
 * @returns {DatasetCore}
 * @throws {TypeError} 
 * @see {@link https://rdf4j.org/documentation/programming/rdfstar/#extended-sparql-json-format | RDF4J's Extended JSON format for SPARQL-Star query results}
 * @see {@link https://www.w3.org/TR/sparql11-results-json/ | SPARQL 1.1 Query Results JSON Format}
 * @see {@link https://rdf.js.org/dataset-spec/#datasetcore-interface | DatasetCore interface}
 */
function toDataset(sparqlQueryResults) {
  try {
    const 
    jsonIn        = sparqlQueryResults,
    subjectName   = jsonIn.head.vars[0],
    predicateName = jsonIn.head.vars[1],
    objectName    = jsonIn.head.vars[2],
    dataset       = rdf.dataset();

    for (const binding of jsonIn.results.bindings) {
      const
      subjectTerm   = createSubjectTerm(binding[subjectName]),
      predicateTerm = createPredicateTerm(binding[predicateName]),
      objectTerm    = createObjectTerm(binding[objectName]);

      dataset.add(t.quad(subjectTerm, predicateTerm, objectTerm, t.defaultGraph()));
    }

    return dataset;

  } catch (error) {
    throw new TypeError(`${error}`);
  }
}


/**
 * Creates an RDF term that is a subject in a triple.
 *
 * @param {object} term
 * @returns {(Quad | NamedNode | BlankNode)}
 */
function createSubjectTerm(term) {
  return createQuad(term) || createNamedNode(term) || createBlankNode(term);
}


/**
 * Creates an RDF term that is a predicate in a triple.
 *
 * @param {object} term
 * @returns {NamedNode}
 */
function createPredicateTerm(term) {
  return createNamedNode(term);
}


/**
 * Creates an RDF term that is an object in a triple.
 *
 * @param {object} term - the JavaScript object that describes
 * @returns {(NamedNode | BlankNode | Literal)}
 * @throws {Error} if the object description is not correct.
 */
function createObjectTerm(term) {
  return createNamedNode(term) || createBlankNode(term) || createLiteral(term);
}


/**
 * Creates a named node.
 *
 * @param {object} term
 * @returns {NamedNode?}
 */
function createNamedNode(term) {
  try {
    if (term.type !== 'uri') return null;
    // if(!iri`${term.value}`)return null;
    return t.namedNode(term.value);
  } catch (_error) {
    return null;
  }
}


/**
 * Creates a blank node.
 *
 * @param {object} term
 * @returns {NamedNode?}
 */
function createBlankNode(term) {
  try {
    if (term.type !== 'bnode') return null;
    return t.blankNode(term.value);
  } catch (_error) {
    return null;
  }
}


/**
 * Creates a literal.
 *
 * @param {object} term
 * @returns {NamedNode?}
 */
function createLiteral(term) {
  try {
    if (term.type !== 'literal') return null;
    if (typeof term['xml:lang'] === 'string') {
      return t.literal(
        term.value,
        term['xml:lang']
      );
    }
    if (typeof term.datatype === 'string') {
      return t.literal(
        term.value,
        t.namedNode(term.datatype)
      );
    }
    return t.literal(term.value);
  } catch (_error) {
    return null;
  }
}


/**
 * Creates a quad.
 *
 * @param {object} term
 * @returns {Quad?}
 */
function createQuad(term) {
  try {
    if (term.type !== 'triple') return null;
    const
    subjectTerm   = createSubjectTerm(term.value.subject),
    predicateTerm = createPredicateTerm(term.value.predicate),
    objectTerm    = createObjectTerm(term.value['object']);

    if (!(subjectTerm && predicateTerm && objectTerm)) {
      return null;
    }
    return t.quad(subjectTerm, predicateTerm, objectTerm, t.defaultGraph());
  } catch (_error) {
    return null;
  }
}


export default toDataset;
export { toDataset };
