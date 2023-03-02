const formFields = [
{ id: 'email', value: 'bmejia22321412221122s5@gmail.com' },{ id: 'email', value: 'bmejia22321412221122s5@gmail.com' },{ id: 'email', value: 'bmejia22321412221122s5@gmail.com' }]
const result = formFields.reduce((acc,cur) => ({...acc, 'id': cur['value'] }), {})
const result = formFields.reduce((acc,cur) => ({...acc, result['id']: cur['value'] }), {})
console.log(result)
