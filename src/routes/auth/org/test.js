const targetKeys = []
const mockData = []
for (let i = 0; i < 20; i++) {
  const data = {
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    chosen: Math.random() * 2 > 1,
  }
  if (data.chosen) {
    targetKeys.push(data.key)
  }
  mockData.push(data)
}
export default {
  targetKeys,
  mockData,
}
