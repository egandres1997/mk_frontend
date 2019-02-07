import { base } from './api'

let tokens = 'tokens'
let navigation = 'menus'
let articles = 'articles'

export default {
  base,
  login: base + tokens,
  navigation: base + navigation,
  articles: base + articles,
}
