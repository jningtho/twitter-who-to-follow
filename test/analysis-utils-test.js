const { describe, it, expect } = require('./setup')
const { getLevels, getCounts, calculateScore } = require('../analysis-utils')
const scoreData = require('./fixtures/calculate-score-fixture')

describe('analysis utils', () => {
  describe('getLevels', () => {
    it('get levels data', () => {
      return getLevels('paul', 'test/fixtures/')
        .then((levels) => {
          expect(levels).to.have.length(2)
          expect(levels[0]).to.have.length(4)
          expect(levels[1]).to.have.length(4)

          expect(levels[0]).to.eql([
            [ { id: 1, screen_name: 'ringo' } ],
            [ { id: 2, screen_name: 'george' } ],
            [ { id: 3, screen_name: 'john' } ],
            [ { id: 5, screen_name: 'michaelJackson' } ]
          ])

          const followedByRingo = levels[1][0].map((user) => user.screen_name)
          const followedByGeorge = levels[1][1].map((user) => user.screen_name)
          const followedByMichael = levels[1][3].map((user) => user.screen_name)

          expect(followedByRingo).to.eql(['paul', 'george', 'john'])
          expect(followedByGeorge).to.eql(['paul', 'john', 'ringo'])
          expect(followedByMichael).to.eql(['paul', 'janetJackson'])
        })
    })
  })

  describe('calculateScore', () => {
    it('returns the score by screen_name', () => {
      const counts = getCounts(scoreData.levels)
      const score = calculateScore(scoreData.levels, counts)

      expect(score).to.eql({
        frodo: 5,
        elrond: 4,
        radagast: 3,
        gandalf: 2,
        merry: 1
      })
    })
  })
})
