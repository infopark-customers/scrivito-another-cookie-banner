import { parseDomain, ParseResultType } from "parse-domain";

export default function domainName(hostname) {
  const parseResult = parseDomain(hostname);
  if (parseResult.type === ParseResultType.Listed) {
    const { topLevelDomains, domain } = parseResult;
    return ["", domain, topLevelDomains.join(".")].join(".");
  }
  return null;
}

export function subdomain(hostname) {
  const parseResult = parseDomain(hostname);
  if (parseResult.type === ParseResultType.Listed) {
    const { subDomains } = parseResult;
    return subDomains.join(".");
  }
  return null;
}
