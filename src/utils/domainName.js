import { parseDomain, ParseResultType } from "parse-domain";

export default function domainName(hostname) {
  // TODO: implement 
  return "localhost";
  const parseResult = parseDomain(hostname);
  console.log("---- domainName:", parseResult);

  switch (parseResult.type) {
    case ParseResultType.Listed: {
      const { hostname, topLevelDomains } = parseResult;
  
      console.log(`${hostname} belongs to ${topLevelDomains.join(".")}`);
      break;
    }
    case ParseResultType.Reserved:
    case ParseResultType.NotListed: {
      const { hostname } = parseResult;
  
      console.log(`${hostname} is a reserved or unknown domain`);
      break;
    }
    default:
      throw new Error(`${hostname} is an ip address or invalid domain`);
  }
  return null;
}