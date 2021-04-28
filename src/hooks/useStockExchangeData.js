import { v4 as uuidv4 } from 'uuid';

const sampleData = [
  {
    name: 'BTC',
    price: 184406.98,
    change: 4.9,
    cap: 3444312.55
  },
  {
    name: 'ETH',
    price: 6138.07,
    change: 5.9,
    cap: 704883.33
  },
  {
    name: 'BNB',
    price: 938.31,
    change: -3.1,
    cap: 144583.29
  },
  {
    name: 'USDT',
    price: 3.27,
    change: -0.3,
    cap: 129465.66
  },
  {
    name: 'AAA',
    price: 184406.98,
    change: 4.9,
    cap: 3444312.55
  },
  {
    name: 'BBB',
    price: 184406.98,
    change: 4.9,
    cap: 3444312.55
  },
  {
    name: 'CCC',
    price: 184406.98,
    change: 4.9,
    cap: 3444312.55
  },
  {
    name: 'DDD',
    price: 184406.98,
    change: 4.9,
    cap: 3444312.55
  },
  {
    name: 'EEE',
    price: 184406.98,
    change: 4.9,
    cap: 3444312.55
  }
];

const useStockExchangeData = () => sampleData.map((data) => ({ uuid: uuidv4(), ...data }));

export default useStockExchangeData;
