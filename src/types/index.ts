// export interface Coin {
//   uuid: string;
//   symbol: string;
//   name: string;
//   color: string;
//   iconUrl: string;
//   marketCap: string;
//   price: string;
//   btcPrice: string;
//   listedAt: number;
//   change: string;
//   rank: number;
//   sparkline: string[];
//   coinrankingUrl: string;
//   '24hVolume': string;
// }
export interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  websiteUrl: string;
  links: Link[];
  supply: {
    confirmed: boolean;
    circulating: string;
    total: string;
  };
  '24hVolume': string;
  marketCap: string;
  price: string;
  btcPrice: string;
  change: string;
  rank: number;
  numberOfMarkets: number;
  numberOfExchanges: number;
  sparkline: string[];
  allTimeHigh: {
    price: string;
    timestamp: number;
  };
  coinrankingUrl: string;
}

export interface ExchangesData {
  status: string;
  data: {
    stats: {
      total: number;
      totalCoins: number;
      totalMarkets: number;
      totalExchanges: number;
      totalMarketCap: string;
      total24hVolume: string;
    };
    coins: Coin[];
  };
}

export interface ExchangeData {
  status: string;
  data: {
    coin: Coin;
  };
}

export interface CoinHistory {
  status: string;
  data: {
    change: string;
    history: Price[];
  };
}

export interface News {
  title: string;
  url: string;
  published_date: string;
  publisher: {
    name: string;
    url: string;
  };
}

export interface NewsData {
  status: string;
  totalResults: number;
  articles: News[];
}

interface Link {
  name: string;
  url: string;
  type: string;
}

interface Price {
  price: string;
  timestamp: number;
}
