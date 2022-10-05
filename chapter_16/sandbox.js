/* eslint-disable no-undef */
const list = document.querySelector('ul')
const form = document.querySelector('form')

const addRecipe = (recipe, id) => {
  const time = recipe.created_at.toDate()
  const html = `
    <li data-id='${id}'>
        <div>
            ${recipe.title}
        </div>
        <div>
            ${time}
        </div>
        <button class="btn btn-danger btn-sm my-2">delete</button>
    </li>
  `
  list.innerHTML += html
}

const removeRecipe = id => {
  const recipes = document.querySelectorAll('li')
  recipes.forEach(recipe => {
    if (recipe.getAttribute('data-id') === id) {
      recipe.remove()
    }
  })
}

db.collection('recipes').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    const doc = change.doc
    if (change.type === 'added') {
      addRecipe(doc.data(), doc.id)
    } else if (change.type === 'removed') {
      removeRecipe(doc.id)
    }
  })
})

form.addEventListener('submit', e => {
  e.preventDefault()
  const now = new Date()
  const recipe = {
    created_at: firebase.firestore.Timestamp.fromDate(now),
    title: form.recipe.value.trim()
  }

  db.collection('recipes').add(recipe)
    .then(() => { console.log('recipe added.') })
    .catch(err => { console.log(err) })

  form.reset()
})

list.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const id = e.target.parentElement.getAttribute('data-id')
    db.collection('recipes').doc(id).delete()
      .then(() => { console.log('recipe deleted.') })
      .catch(err => { console.log(err) })
  }
}
)
