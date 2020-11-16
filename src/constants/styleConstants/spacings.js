const BLOCK_SIZE = 4;

const multiplyBy = (multiplier) => `${BLOCK_SIZE * multiplier}px`;

const Spacings = {
  B1: multiplyBy(1),
  B2: multiplyBy(2),
  B3: multiplyBy(3),
  B4: multiplyBy(4)
};

export default Spacings;
