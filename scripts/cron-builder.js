// Name: Cron Builder
// Description: Prompts user for desired intervals, creates a cron schedule based on user input, and describes it
// Author: Ricardo Gonçalves Bassete

import "@johnlindquist/kit"
import cronstrue from 'cronstrue';

const commonValues = [
  '------------------------------',
  '* =	any value',
  ', =	value list separator',
  '- =	range of values',
  '/ =	step values',
]

const minuteValues = [
  "Allowed Values = 0 - 59",
  ...commonValues,
]

const hourValues = [
  "Allowed Values = 0 - 23",
  ...commonValues,
]

const dayMonthValues = [
  "Allowed Values = 1 - 31",
  ...commonValues,
]

const monthValues = [
  "Allowed Values = 1 - 12",
  ...commonValues,
]

const dayWeekValues = [
  "Allowed Values = 0 - 6",
  '------------------------------',
  "0 = Sunday",
  "1 = Monday",
  "2 = Tuesday",
  "3 = Wednesday",
  "4 = Thursday",
  "5 = Friday",
  "6 = Saturday",
  ...commonValues
]

const minute = await arg({
  placeholder: 'Minute interval, default is *',
  alwaysOnTop: true,
  hint: minuteValues.join('\n')
}).then(input => input === '' ? '*' : input)

const hour = await arg({
  placeholder: 'Hour interval, default is *',
  alwaysOnTop: true,
  hint: hourValues.join('\n')
}).then(input => input === '' ? '*' : input)

const dayMonth = await arg({
  placeholder: 'Day of the month interval, default is *',
  alwaysOnTop: true,
  hint: dayMonthValues.join('\n')
}).then(input => input === '' ? '*' : input)

const month = await arg({
  placeholder: 'Month interval, default is *',
  alwaysOnTop: true,
  hint: monthValues.join('\n')
}).then(input => input === '' ? '*' : input)

const dayWeek = await arg({
  placeholder: 'Day of the week interval, default is *',
  alwaysOnTop: true,
  hint: dayWeekValues.join('\n')
}).then(input => input === '' ? '*' : input)

const result = `${minute} ${hour} ${dayMonth} ${month} ${dayWeek}`

await div({
  alwaysOnTop: true,
  enter: 'Press Enter to paste result',
  html: `
    <div class="p-5 prose prose-sm">
    <h1>${cronstrue.toString(result)}</h1>
    <p>${result}</p>
    </div>
  `,
  onSubmit: () => setSelectedText(result)
})