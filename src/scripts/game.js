
import axios from 'axios'
import $ from 'jquery'
import imagesLoaded from 'imagesloaded'
import '../sass/styles.scss'
import timeUpImgUrl from '../images/banner/TIMEUP.png'

import {
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection
} from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'
import state from './state'
import init, { getGridSize } from './init'
import {
  updateHud,
  updateAsset,
  changeFrame,
  showLoadingScreen,
  gameBanner,
  preload,
  preloadImages,
  showFailScreen,
  gameTitle,
  showLeaderboard
} from './hud'

imagesLoaded.makeJQueryPlugin($)

let lastRenderTime = 0
let gameOver = false

export const gameBoard = document.getElementById('game-board')

preload(preloadImages)

const query = 'rY5F7jcSAwqv7IIiwFIyz9ahyTe0voZQ2xgJgekx61JdZU25qtmrvHmNXBbR%2BHs9Q118EAduftz3DyGwVrOUbcAp4J08D4vUQ3j5ec57%2F0PY5LleLKwUiCxasvQueuhlUbmCg3ObR9dDlvnbAckUdD%2BSk3ofq3%2Fd%2BuGEsFAr8m0B8w4ctl4sPJGicTWcnBMmTui%2B4S6PNNG2Q1w1c%2FNRfsyKlTjmLkjD5mOnir6IMfugoWTJznKIcd%2BWyrZwozDKbjoZV6eGANtnj5dEnmVo9zcsGllbkf8Ci%2BG3jssD754uSfdp3JDg%2FIXVL6kr6agv8QoI7Eh3L7IjgpjqDcel596G5Urv6OI2Ui%2FilVneIJcKKqj0VULk6Pp8IDkiVGG3QqOR%2F8jWkNme9XrQW%2BsNWt1YdFmL%2FL%2Fg%2F37M3KT%2FpEO1kGHajKIj1AWV7QovMcS8nG%2FSDYF%2B5iFmJHYXJ6HjI7xKUHEMLKortePQYVgRyCdyCnV8kINJOnT5FFpcpfTyS5nLl20TQ%2FR8QjGZyK4X2LGLZQzT%2FgQxTqUUWqGe8Ox36hUNyO9TPxEI2cONORpUkpT5YUdpSf4UX7A9%2Fgs%2FSvPTNRot2u9vyQYGCovvV9v0fN3FIUIY%2B1XfUBO%2BVl1Y0OAGdy04UD5deUh3nuO9KZbWf9tmF2rvR7AmJnSKr0%2FFUYesqboJSLPAZPExCwIODubgeBVK2ectsyk9U%2BMhQAZSa4cs4KJOoFtHu9O%2BjfwgFGszDKGXzXcAarXiV7I4miU5PIG2ueQwU0WUL4h5YMe9V23k0bGeGT1Xu1TvUH6XLJ5dI3Y8OVKpvvoKazDboKWpHYYKty1Gao3oAWjvbQJy7xsxmrIQ0QcoGtyn7IyVP%2Bo2afEEpQXdlPC9pCFYOu5HZRbfnvlacU0FmAT8zG7hfCgixaksIYWXuux8Go8WMpjLxpQZvj%2BoI7pbJOiTmkP6zqxAyu3faVqGcTVM5KVHhn23AtqZPkMu5W2i1Ilvr1NjrR6NFpSdnTJoG1Xwq8XZnRlWWNAn%2FVKJnS9SoYLFnOq2Bu8zhigARfAkH%2FaGeBMHSfXW%2FILkowfVVjZQLrF%2BHqWN6ZSDo1VHgjB0r47EzOzunJo18LfnCbGP4ZxF84IOMHvd%2F2F5mMcMkdINq%2BCX%2B6EP0c6KWR4urnOldqH%2BDalDWsf5IhW1pS0z%2BTD3iEkGu6maRfCoMjDBTCNVG5PrM8D0jB%2B%2FFUTeKUzN45uBMMvUOX4N0v9cD4IZbNwDyXuSNAOih6UpaT22Jc0K%2FUJnRoNE%2FUejJe%2FsDBhX4sjkNBzLJwndNRjVEAAFVAeaNwNXU9gU%2BZtYPgScjtto7gOtEMtp5mwB5Bocxk2q9FCfO3c1INgiJO53vT%2F08nLnVDTvAW7Nb4r3wPgxXvZrnFAfczIWFqeyTZtoUi%2FPiXJot7TYgP5aYi0mq8wWc2MTSWaNhQO5jeCkJaNROIWpEvAJAa8203BVUIpUQwwxmGB9BqOMaqsMGYOk%2BGJfqxirsVKW%2F2nsxQD9zE9uAUTP5ZHdf1928lq1JscJzLr0IYLKS3kY1Cv8ZGa6%2FSZQMBU43QHiDV5AQX%2BmSucV4sp34iVSTa%2FAFR9xGSMd7TNqgXU%2BQ2yckj%2BydGkGUV6PYF5YnNIuwg24KMS96VyKmVEb3j4%2Fe2%2F6m7jj4EIr8FCjR53nhVs7PJam%2BMy%2Br90i2xECKeYasvFksNSBTNCEjWLtRm5wsOtdTzPURz5G4SP0vz05PCsQwqbEBVf8nBG3J6vm%2FHm%2Fh9QVhmXnwLUIrpN8ArT3sLrxB4sfy7kVaIpGu%2BgLS27kKhaw9NyHgKfREd7vmykv5niJ7v0NZx8QIqU3YO%2Fx4K34gUpUHp2ffNnzWKt5GzU%2BwXSjNtAI0HOhf6f12XUDr6owVrVDkd4pOwfNt7VQa2aOvIQelmfQz1kvSQ1xVxV39QTQIxBpZcLQ0e89GXUBylxTVjMqQtDSriNT%2FmpSnEO7M%2FB98sfsPcrbddzB%2FbxKMK8n24deXXQtYfUoeDotCoen7laplc6FyTOREfViudAkTx1eEfy9ixNiVesWBgIFBcGE1z7sKcixgDFArESO7UKTXtfVwjtAZIF7aXeHBYxEjtVNbLf%2BeYFF5VlYDIteyBrz159O49z%2Bj%2BtXxrN9t9NNDD8qU76GlyIDiUEn0JuSpT4n4hddX0%2BjnAcG3b3ZfpE1nVLAWB5lstuD88V7N3clOOQ4bb9pFZpitCxKyWVHyxbFJ%2FRwNjtkqATJYxxA%2FiaIg8G335ZtZaj2BaSAfjiHdXln4WHpApS%2FzyvSPTr4Q%2BqAT5y8L3TwLFJtN5T05o826%2BwDqDaU%2FxbOwvR9FElApx6C8b3slMBEA0aVQjLAfN4CfHDPdT4GsyNWhQ4NEnZXTL4AfUCb4OlIHMj75M0KEna%2B1RngSQDIR26iDlxd3qCz5uRyZlexTXGpBIsITEeH5Im0Na9tHHY%3D'
$('#game-container')
  .imagesLoaded({ background: true })
  .done(function () {
    $('#overlay').fadeOut()
    init()

    // Click start button to play
    $('#play-button, [data-next="#play-screen"]').on('click', function () {
      state.GRID_SIZE = getGridSize(gameBoard)
      runCountdown()
      start()
    })

    axios.post('https://games-staging.pmisg.cloud.sg/pmi-backoffice/public/api/gameplay2021/init', null, {
      params: {
        query: decodeURIComponent(query),
        user_agent: navigator.userAgent,
        game: 'snake-leaderboard'
      }
    })
      .then(res => {
        state._current_user = res.data.data
      })
      .catch(err => console.log(err.message))
  })
  .progress(function (instance, image) {
    const result = image.isLoaded ? 'loaded' : 'broken'
    // console.log('image is ' + result + ' for ' + image.img.src)
  })

$('.play-again').click(function () {
  location.reload()
})

$('.exit').click(function () {
  location.href = $(this).data('href')
})

$('[data-next="#leaderboard"]').click(function () {
  showLeaderboard()
})

// $('#replay').click(function () {
//   axios.put(`https://games-staging.pmisg.cloud.sg/pmi-backoffice/public/api/gameplay2021/replay/${state._current_id}`)
//     .then(res => console.log('replay', res))
// })

// $('#render').click(function () {
//   axios.get(`https://games-staging.pmisg.cloud.sg/pmi-backoffice/public/api/gameplay2021/leaderboard/snake?query=${query}`)
//     .then(res => console.log('render', res))
//     .catch(err => console.log(err))
// })

const timer = document.querySelector('#timer')
function runCountdown () {
  timer.textContent = state.COUNTDOWN
  if (state.COUNTDOWN-- > 0) {
    setTimeout(runCountdown, 1000)
  }
}

function showGameOverScreen () {
  changeFrame('red-headless')
  $(gameTitle).fadeIn()
  $(gameBanner).hide()
  $('.result-score').text(state.SCORE || '0')
}

function main (currentTime) {
  if (gameOver) {
    if (state.COUNTDOWN <= 0) {
      showGameOverScreen()
      updateAsset(gameBanner, timeUpImgUrl)
    }
    state.COUNTDOWN = 0

    if (state.SCORE <= state.MIN_SCORE) {
      showGameOverScreen()
      setTimeout(() => showFailScreen(), 1500)

      return
    }

    showGameOverScreen()
    setTimeout(() => showLoadingScreen(), 1500)

    return
  }

  window.requestAnimationFrame(main)

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / state.SNAKE_SPEED) return

  lastRenderTime = currentTime

  update()
  draw()
}

function start () {
  state.GRID_SIZE = getGridSize(gameBoard)
  $(gameBanner).fadeOut()
  window.requestAnimationFrame(main)
}

function update () {
  updateSnake()
  updateFood()
  checkDeath()
  updateHud()
}

function draw () {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath () {
  gameOver =
    outsideGrid(getSnakeHead()) || snakeIntersection() || state.COUNTDOWN < 0
}
