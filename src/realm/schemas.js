/*简单皮肤样式*/
const themeSchema = {
  name: 'Theme',
  primaryKey: 'id',
  properties: {
    id: 'int',
    color: 'string',
  }
}

export default {
  schema: [
    themeSchema,
  ],
  path: 'douban.realm',
  schemaVersion:1
}