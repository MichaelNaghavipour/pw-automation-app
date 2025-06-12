import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
    duration: '5m',
    vus: 5,
};

export default function () {
    let res = http.get('http://localhost:4200/pages/forms/layouts')
    check(res, {
        'is status 200': (r) => r.status === 200,
        'text verification': (r) => r.body.includes('Option 1')
    })
    sleep(Math.random() * 5)
}