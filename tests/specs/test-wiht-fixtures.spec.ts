import { test } from '../../test-options'
import { faker } from '@faker-js/faker'

test('Parameterized Methods', async ({ pageManager }) => {
    const randomFullName = faker.person.fullName({ lastName: 'Tester' })
    const randomEmail = `${randomFullName.toLowerCase().replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.EMAIL, process.env.PASSWORD, 'Option 2')
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
})

