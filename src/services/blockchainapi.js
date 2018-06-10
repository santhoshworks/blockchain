import axios from 'axios';

export function getBlocks() {
  return axios.get('https://blockchain.info/blocks?format=json&cors=true');
}

export function getBlockById(hash) {
  return axios.get(`https://blockchain.info/rawblock/${hash}?cors=true`);
}

export default { getBlocks, getBlockById };
