import dns from "dns";
import whois from "whois-json";

async function getDNSLookupTime(targetUrl: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const { hostname } = new URL(targetUrl);
      const start = performance.now();
      dns.lookup(hostname || "", (err) => {
        if (err) {
          reject(err);
        } else {
          const end = performance.now();
          resolve(Math.ceil(end - start));
        }
      });
    });
  }
  
  async function getDomainExpiryDate(targetUrl: string): Promise<string | null> {
    const { hostname } = new URL(targetUrl);
    const whoisData = await whois(hostname || "") as { registrarRegistrationExpirationDate?: string };
    console.log("whoisData", whoisData);
    const expiryDate = whoisData.registrarRegistrationExpirationDate ? new Date(whoisData.registrarRegistrationExpirationDate).toISOString(): null;
    console.log("expiryDate", expiryDate);
    return expiryDate;
  }

  export { getDNSLookupTime, getDomainExpiryDate };