const
/**
 * The unofficial MIME type for SPARQL-Star Results.
 * This is a format that is used in production applications.
 * This new format was introduced by the RDF4J team and they have chosen a MIME type for it,
 * but GraphDB is using another MIME type in production for that same format,
 * so here are both of the unofficial MIME types.
 * @see {@link https://rdf4j.org/documentation/programming/rdfstar/#extended-sparql-json-format}
 */
contentType = {
  rdf4j  : 'application/x-sparqlstar-results+json',
  graphdb: 'application/x-graphdb-table-results+json',
}

export default contentType;
export {contentType};
