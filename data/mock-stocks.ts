// Generate comprehensive mock stock data
const sectors = ["Technology", "Banking", "Healthcare", "Energy", "Consumer", "Industrial", "Finance"]

const generateChartData = () => {
  const data = []
  const now = new Date()
  let basePrice = 1000 + Math.random() * 2000

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    // Add some realistic price movement
    const change = (Math.random() - 0.5) * 0.05 // -2.5% to +2.5%
    basePrice = Math.max(basePrice * (1 + change), 10)

    data.push({
      time: date.toISOString(),
      price: basePrice,
    })
  }

  return data
}

const stockNames = [
  // Technology
  { symbol: "TECHCORP", name: "TechCorp Solutions Ltd", sector: "Technology" },
  { symbol: "INNOVATE", name: "Innovate Systems Inc", sector: "Technology" },
  { symbol: "DIGITECH", name: "DigiTech Enterprises", sector: "Technology" },
  { symbol: "CLOUDNET", name: "CloudNet Technologies", sector: "Technology" },
  { symbol: "AITECH", name: "AI Technologies Ltd", sector: "Technology" },
  { symbol: "CYBERSEC", name: "CyberSec Solutions", sector: "Technology" },
  { symbol: "DATAFLOW", name: "DataFlow Systems", sector: "Technology" },
  { symbol: "QUANTUM", name: "Quantum Computing Corp", sector: "Technology" },
  { symbol: "NANOTECH", name: "NanoTech Industries", sector: "Technology" },
  { symbol: "ROBOTICS", name: "Robotics Dynamics", sector: "Technology" },
  { symbol: "BIOTECH", name: "BioTech Innovations", sector: "Technology" },
  { symbol: "GREENTECH", name: "GreenTech Solutions", sector: "Technology" },
  { symbol: "SMARTDEV", name: "Smart Devices Inc", sector: "Technology" },
  { symbol: "WEBTECH", name: "WebTech Services", sector: "Technology" },
  { symbol: "APPDEV", name: "App Development Co", sector: "Technology" },

  // Banking
  { symbol: "MEGABANK", name: "Mega Bank Corporation", sector: "Banking" },
  { symbol: "TRUSTBANK", name: "Trust Bank Limited", sector: "Banking" },
  { symbol: "CITYBANK", name: "City Banking Solutions", sector: "Banking" },
  { symbol: "GLOBALBANK", name: "Global Bank International", sector: "Banking" },
  { symbol: "NEOBANK", name: "Neo Banking Services", sector: "Banking" },
  { symbol: "FINANCEPLUS", name: "Finance Plus Bank", sector: "Banking" },
  { symbol: "CREDITBANK", name: "Credit Bank Corp", sector: "Banking" },
  { symbol: "INVESTBANK", name: "Investment Bank Ltd", sector: "Banking" },
  { symbol: "MICROBANK", name: "Micro Finance Bank", sector: "Banking" },
  { symbol: "DIGITALBANK", name: "Digital Banking Co", sector: "Banking" },
  { symbol: "RURALBANK", name: "Rural Development Bank", sector: "Banking" },
  { symbol: "COMMERCEBANK", name: "Commerce Bank Ltd", sector: "Banking" },
  { symbol: "SAVINGSBANK", name: "Savings Bank Corp", sector: "Banking" },
  { symbol: "COOPERBANK", name: "Cooperative Bank", sector: "Banking" },
  { symbol: "UNIONBANK", name: "Union Bank Limited", sector: "Banking" },

  // Healthcare
  { symbol: "MEDTECH", name: "MedTech Healthcare", sector: "Healthcare" },
  { symbol: "PHARMAPLUS", name: "Pharma Plus Limited", sector: "Healthcare" },
  { symbol: "BIOCARE", name: "BioCare Solutions", sector: "Healthcare" },
  { symbol: "HEALTHSYS", name: "Health Systems Inc", sector: "Healthcare" },
  { symbol: "MEDEQUIP", name: "Medical Equipment Co", sector: "Healthcare" },
  { symbol: "LIFESCI", name: "Life Sciences Corp", sector: "Healthcare" },
  { symbol: "WELLNESS", name: "Wellness Healthcare", sector: "Healthcare" },
  { symbol: "DIAGNOSTICS", name: "Diagnostics Limited", sector: "Healthcare" },
  { symbol: "VACCINES", name: "Vaccines Corporation", sector: "Healthcare" },
  { symbol: "MEDRESEARCH", name: "Medical Research Ltd", sector: "Healthcare" },
  { symbol: "HOSPITALS", name: "Hospitals Group", sector: "Healthcare" },
  { symbol: "PHARMACY", name: "Pharmacy Chain Ltd", sector: "Healthcare" },
  { symbol: "MEDDEVICE", name: "Medical Devices Inc", sector: "Healthcare" },
  { symbol: "GENETICS", name: "Genetics Research Co", sector: "Healthcare" },
  { symbol: "TELEMEDICINE", name: "Telemedicine Services", sector: "Healthcare" },

  // Energy
  { symbol: "POWERGEN", name: "Power Generation Corp", sector: "Energy" },
  { symbol: "SOLARTECH", name: "Solar Technology Ltd", sector: "Energy" },
  { symbol: "WINDPOWER", name: "Wind Power Solutions", sector: "Energy" },
  { symbol: "OILGAS", name: "Oil & Gas Corporation", sector: "Energy" },
  { symbol: "RENEWABLE", name: "Renewable Energy Co", sector: "Energy" },
  { symbol: "NUCLEAR", name: "Nuclear Power Ltd", sector: "Energy" },
  { symbol: "HYDROPOWER", name: "Hydro Power Corp", sector: "Energy" },
  { symbol: "ENERGYSTOR", name: "Energy Storage Inc", sector: "Energy" },
  { symbol: "BIOFUEL", name: "Bio Fuel Technologies", sector: "Energy" },
  { symbol: "GEOTHERMAL", name: "Geothermal Energy", sector: "Energy" },
  { symbol: "COALPOWER", name: "Coal Power Limited", sector: "Energy" },
  { symbol: "GASUTIL", name: "Gas Utilities Corp", sector: "Energy" },
  { symbol: "ELECTUTIL", name: "Electric Utilities", sector: "Energy" },
  { symbol: "SMARTGRID", name: "Smart Grid Solutions", sector: "Energy" },
  { symbol: "CLEANENERGY", name: "Clean Energy Corp", sector: "Energy" },

  // Consumer
  { symbol: "RETAILCORP", name: "Retail Corporation", sector: "Consumer" },
  { symbol: "FOODBEV", name: "Food & Beverages Ltd", sector: "Consumer" },
  { symbol: "FASHION", name: "Fashion Brands Inc", sector: "Consumer" },
  { symbol: "HOMEGOODS", name: "Home Goods Company", sector: "Consumer" },
  { symbol: "ELECTRONICS", name: "Electronics Retail", sector: "Consumer" },
  { symbol: "GROCERY", name: "Grocery Chain Ltd", sector: "Consumer" },
  { symbol: "LUXURY", name: "Luxury Brands Corp", sector: "Consumer" },
  { symbol: "SPORTS", name: "Sports Equipment Co", sector: "Consumer" },
  { symbol: "TOYS", name: "Toys & Games Ltd", sector: "Consumer" },
  { symbol: "COSMETICS", name: "Cosmetics Corporation", sector: "Consumer" },
  { symbol: "FURNITURE", name: "Furniture Solutions", sector: "Consumer" },
  { symbol: "APPLIANCES", name: "Home Appliances Inc", sector: "Consumer" },
  { symbol: "BOOKS", name: "Books & Media Corp", sector: "Consumer" },
  { symbol: "JEWELRY", name: "Jewelry Designs Ltd", sector: "Consumer" },
  { symbol: "AUTOMOTIVE", name: "Automotive Parts Co", sector: "Consumer" },

  // Industrial
  { symbol: "MANUFACTURING", name: "Manufacturing Corp", sector: "Industrial" },
  { symbol: "CONSTRUCTION", name: "Construction Ltd", sector: "Industrial" },
  { symbol: "MACHINERY", name: "Machinery Solutions", sector: "Industrial" },
  { symbol: "AEROSPACE", name: "Aerospace Industries", sector: "Industrial" },
  { symbol: "DEFENSE", name: "Defense Systems Corp", sector: "Industrial" },
  { symbol: "SHIPPING", name: "Shipping & Logistics", sector: "Industrial" },
  { symbol: "MINING", name: "Mining Corporation", sector: "Industrial" },
  { symbol: "STEEL", name: "Steel Industries Ltd", sector: "Industrial" },
  { symbol: "CHEMICALS", name: "Chemical Solutions", sector: "Industrial" },
  { symbol: "MATERIALS", name: "Advanced Materials", sector: "Industrial" },
  { symbol: "PACKAGING", name: "Packaging Solutions", sector: "Industrial" },
  { symbol: "TEXTILES", name: "Textiles Corporation", sector: "Industrial" },
  { symbol: "PAPER", name: "Paper & Pulp Ltd", sector: "Industrial" },
  { symbol: "CEMENT", name: "Cement Industries", sector: "Industrial" },
  { symbol: "METALS", name: "Metals & Alloys Corp", sector: "Industrial" },

  // Finance
  { symbol: "INSURANCE", name: "Insurance Corporation", sector: "Finance" },
  { symbol: "INVESTMENT", name: "Investment Services", sector: "Finance" },
  { symbol: "MUTUAL", name: "Mutual Fund Corp", sector: "Finance" },
  { symbol: "PENSION", name: "Pension Fund Ltd", sector: "Finance" },
  { symbol: "CREDIT", name: "Credit Services Inc", sector: "Finance" },
  { symbol: "LEASING", name: "Leasing Solutions", sector: "Finance" },
  { symbol: "MORTGAGE", name: "Mortgage Corporation", sector: "Finance" },
  { symbol: "WEALTH", name: "Wealth Management", sector: "Finance" },
  { symbol: "TRADING", name: "Trading Services Ltd", sector: "Finance" },
  { symbol: "FINTECH", name: "FinTech Innovations", sector: "Finance" },
  { symbol: "PAYMENTS", name: "Payment Solutions", sector: "Finance" },
  { symbol: "LENDING", name: "Lending Corporation", sector: "Finance" },
  { symbol: "BROKERAGE", name: "Brokerage Services", sector: "Finance" },
  { symbol: "REALESTATE", name: "Real Estate Finance", sector: "Finance" },
  { symbol: "COMMODITY", name: "Commodity Trading", sector: "Finance" },
]

export const mockStocks = stockNames.map((stock, index) => {
  const basePrice = 100 + Math.random() * 4900 // ₹100 to ₹5000
  const changePercent = (Math.random() - 0.5) * 10 // -5% to +5%
  const change = basePrice * (changePercent / 100)

  return {
    symbol: stock.symbol,
    name: stock.name,
    price: basePrice,
    change: change,
    changePercent: changePercent,
    sector: stock.sector,
    marketCap: Math.floor(Math.random() * 1000000000000), // Random market cap
    volume: Math.floor(Math.random() * 10000000), // Random volume
    high52w: basePrice * (1 + Math.random() * 0.5), // 52 week high
    low52w: basePrice * (1 - Math.random() * 0.3), // 52 week low
    chartData: generateChartData(),
  }
})
