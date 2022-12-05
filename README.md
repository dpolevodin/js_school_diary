# Diary for JS school

## installation:

```javascript
git clone git@github.com:dpolevodin/js_school_diary.git
cd js_school_diary
npm install
npm run dev
```

## Technology Stack:
[![StackShare](https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/stackshare/awesome-stacks)

- #### Development environment: <br>**Vite** (https://vitejs.dev/)
- #### Language:<br><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/160px-Typescript_logo_2020.svg.png" width="24"> **TypeScript** (https://www.typescriptlang.org/) 
- #### State manager: <br><img src="https://effector.dev/img/comet.png" width="24"> **Effector** (https://effector.dev/) 
- #### React UI library: <br><img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" width="24"> **Ant Design** (https://ant.design/) 
- #### Git hooks: <br>🐶 **Husky** (https://typicode.github.io/husky/#/) 
- #### Code analyzer: <br><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ESLint_logo.svg/24px-ESLint_logo.svg.png?20211012234406"> **ESLint** (https://eslint.org/) 
- #### Code formatter: <br><img src="https://prettier.io/icon.png" width="24"> **Prettier** (https://prettier.io/) 
- #### Committing rules tools: <br> **Commitizen** (https://commitizen-tools.github.io/commitizen/) 

## Commit messages specification:
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
<br>The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention dovetails with SemVer, by describing the features, fixes, and breaking changes made in commit messages.

#### The commit message should be structured as follows:
```bash
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```

#### Commit message examples:
- Commit message with no body:
```bash
docs: correct spelling of CHANGELOG
```
- Commit message with description and breaking change footer:
```bash
feat: allow provided config object to extend other configs
BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

## CSS className naming rules:
<img src="https://avatars2.githubusercontent.com/u/698437?v=3&s=400" width="24">**Airbnb CSS Styleguide**(https://github.com/airbnb/css#oocss-and-bem)
<br>Follow variant of BEM(Block-Element-Modifier) naming convention, with PascalCased “blocks”, underscores and dashes are used for modifiers and children.

**Example**

```jsx
// ListingCard.jsx
function ListingCard() {
  return (
    <article class="ListingCard ListingCard--featured">
      <h1 class="ListingCard__title">Adorable 2BR in the sunny Mission</h1>
      <div class="ListingCard__content">
        <p>Vestibulum id ligula porta felis euismod semper.</p>
      </div>
    </article>
  );
}
```

```css
/* ListingCard.css */
.ListingCard { }
.ListingCard--featured { }
.ListingCard__title { }
.ListingCard__content { }
```

  * `.ListingCard` is the “block” and represents the higher-level component
  * `.ListingCard__title` is an “element” and represents a descendant of `.ListingCard` that helps compose the block as a whole.
  * `.ListingCard--featured` is a “modifier” and represents a different state or variation on the `.ListingCard` block.