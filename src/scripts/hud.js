import $ from 'jquery'
import axios from 'axios'
import state from './state'

import holdonImgUrl from '../images/title/snake-title-holdon.png'
import ohyesImgUrl from '../images/title/snake-title-oh-yes.png'
import ohnoImgUrl from '../images/title/snake-title-oh-no.png'
import introImgUrl from '../images/title/snake-title-introducing.png'
import leaderboardImgUrl from '../images/title/snake-title-leaderboard.png'

import loadingImgUrl from '../images/banner/LOADING.png'
import congratImgUrl from '../images/banner/CONGRATULATION.png'
import NBTImgUrl from '../images/banner/NEXTBIGTHING.png'
import howtoplayImgUrl from '../images/banner/HOWTOPLAY.png'
import timeUpImgUrl from '../images/banner/TIMEUP.png'
import tryagAinImgUrl from '../images/banner/TRYAGAIN.png'
import top10ImgUrl from '../images/banner/TOP10.png'
import xlImgUrl from '../images/banner/EXTRALONG.png'
import xfImgUrl from '../images/banner/EXTRAFIRM.png'
import xvImgUrl from '../images/banner/EXTRAVALUE.png'

import pipeBlueImg from '../images/pipe-blue.png'
import pipeRedImg from '../images/pipe-red.png'
import headerRedHeadlessImg from '../images/header-red-headless.png'
import headerBlueImg from '../images/header-blue.png'
import headerBlueHeadlessImg from '../images/header-blue-headless.png'
import footerBlueImg from '../images/footer-blue.png'
import footerRedImg from '../images/footer-red.png'

export const frame = {
  'pipe-blue': pipeBlueImg,
  'pipe-red': pipeRedImg,
  'header-red-headless': headerRedHeadlessImg,
  'header-blue': headerBlueImg,
  'header-blue-headless': headerBlueHeadlessImg,
  'footer-blue': footerBlueImg,
  'footer-red': footerRedImg
}

export const preloadImages = [
  ...Object.values(frame),
  holdonImgUrl,
  loadingImgUrl,
  ohyesImgUrl,
  congratImgUrl,
  NBTImgUrl,
  howtoplayImgUrl,
  introImgUrl,
  timeUpImgUrl,
  xlImgUrl,
  xvImgUrl,
  xfImgUrl,
  tryagAinImgUrl,
  ohnoImgUrl,
  leaderboardImgUrl,
  top10ImgUrl
]

export function preload (images) {
  if (document.images) {
    let i = 0
    const imageObj = new Image()
    for (i = 0; i <= images.length - 1; i++) {
      $('body').append('<img src="' + images[i] + '" class="preloaded"/>') // Write to page (uncomment to check images)
      imageObj.src = images[i]
    }
  }
}

let sequence
const score = document.getElementById('score')

const gameHeader = document.getElementById('game-header')
const gameBoard = document.getElementById('game-board')
const gameFooter = document.getElementById('game-footer')
const gameBody = document.getElementById('game-body')
export const gameBanner = document.querySelector('.banner-image')
// const gameContainer = document.getElementById('game-container')
export const gameTitle = document.querySelector('.big-title')

// $('[data-next="#coming-soon"]').click(function () {
//   updateAsset(gameTitle, introImgUrl)
//   updateAsset(gameBanner, NBTImgUrl)
// })

export function nextScreen () {
  const id = $(this).data('next')
  if ($(id).data('banner') === 'howtoplay') {
    updateAsset(gameBanner, howtoplayImgUrl)
  }

  if ($(id).find('.banner-url')) {
    updateAsset(gameBanner, $(id).find('.banner-url').attr('src'))
  }

  $(this)
    .closest('.screen')
    .fadeOut(function () {
      $(id).fadeIn()

      if ($(id).data('animate-on-visible')) {
        animateOnvisible($(id).data('animate-on-visible'), id)
      }

      if ($(id).find('.anim-sequence').length < 1) {
        return cancelAnimationFrame(sequence)
      }

      animate(
        $(id),
        $(id).find('.anim-sequence').data('total-frames'),
        $(id).find('.anim-sequence').data('duration')
      )
    })
}

export function showLoadingScreen () {
  resetGame()
  changeFrame('red-headless')
  updateAsset(gameTitle, holdonImgUrl)
  updateAsset(gameBanner, loadingImgUrl)

  $('#data-transmit').fadeIn()
  animate($('#data-transmit'), 59, 1000)

  axios.put(`https://games-staging.pmisg.cloud.sg/pmi-backoffice/public/api/gameplay2021/completed/${state._current_user.id}`, {
    score: state.SCORE
  })
    .then(res => {
      showFinalScore()
    })
    .catch(err => console.log(err))
}

function showFinalScore () {
  resetGame()
  $('.screen').fadeOut()
  changeFrame('blue-headless')
  updateAsset(gameTitle, ohyesImgUrl)
  updateAsset(gameBanner, congratImgUrl)
  $('#final-score').fadeIn()
  animate($('#final-score'), 29, 1000)
}

export function showLeaderboard () {
  $('.separator').hide()
  $('.screen').fadeOut()
  changeFrame('blue-headless')
  $(gameTitle).hide()
  updateAsset(gameTitle, leaderboardImgUrl)
  updateAsset(gameBanner, top10ImgUrl)
  $('#leaderboard').fadeIn()

  const query = 'rY5F7jcSAwqv7IIiwFIyz9ahyTe0voZQ2xgJgekx61JdZU25qtmrvHmNXBbR%2BHs9Q118EAduftz3DyGwVrOUbcAp4J08D4vUQ3j5ec57%2F0PY5LleLKwUiCxasvQueuhlUbmCg3ObR9dDlvnbAckUdD%2BSk3ofq3%2Fd%2BuGEsFAr8m0B8w4ctl4sPJGicTWcnBMmTui%2B4S6PNNG2Q1w1c%2FNRfsyKlTjmLkjD5mOnir6IMfugoWTJznKIcd%2BWyrZwozDKbjoZV6eGANtnj5dEnmVo9zcsGllbkf8Ci%2BG3jssD754uSfdp3JDg%2FIXVL6kr6agv8QoI7Eh3L7IjgpjqDcel596G5Urv6OI2Ui%2FilVneIJcKKqj0VULk6Pp8IDkiVGG3QqOR%2F8jWkNme9XrQW%2BsNWt1YdFmL%2FL%2Fg%2F37M3KT%2FpEO1kGHajKIj1AWV7QovMcS8nG%2FSDYF%2B5iFmJHYXJ6HjI7xKUHEMLKortePQYVgRyCdyCnV8kINJOnT5FFpcpfTyS5nLl20TQ%2FR8QjGZyK4X2LGLZQzT%2FgQxTqUUWqGe8Ox36hUNyO9TPxEI2cONORpUkpT5YUdpSf4UX7A9%2Fgs%2FSvPTNRot2u9vyQYGCovvV9v0fN3FIUIY%2B1XfUBO%2BVl1Y0OAGdy04UD5deUh3nuO9KZbWf9tmF2rvR7AmJnSKr0%2FFUYesqboJSLPAZPExCwIODubgeBVK2ectsyk9U%2BMhQAZSa4cs4KJOoFtHu9O%2BjfwgFGszDKGXzXcAarXiV7I4miU5PIG2ueQwU0WUL4h5YMe9V23k0bGeGT1Xu1TvUH6XLJ5dI3Y8OVKpvvoKazDboKWpHYYKty1Gao3oAWjvbQJy7xsxmrIQ0QcoGtyn7IyVP%2Bo2afEEpQXdlPC9pCFYOu5HZRbfnvlacU0FmAT8zG7hfCgixaksIYWXuux8Go8WMpjLxpQZvj%2BoI7pbJOiTmkP6zqxAyu3faVqGcTVM5KVHhn23AtqZPkMu5W2i1Ilvr1NjrR6NFpSdnTJoG1Xwq8XZnRlWWNAn%2FVKJnS9SoYLFnOq2Bu8zhigARfAkH%2FaGeBMHSfXW%2FILkowfVVjZQLrF%2BHqWN6ZSDo1VHgjB0r47EzOzunJo18LfnCbGP4ZxF84IOMHvd%2F2F5mMcMkdINq%2BCX%2B6EP0c6KWR4urnOldqH%2BDalDWsf5IhW1pS0z%2BTD3iEkGu6maRfCoMjDBTCNVG5PrM8D0jB%2B%2FFUTeKUzN45uBMMvUOX4N0v9cD4IZbNwDyXuSNAOih6UpaT22Jc0K%2FUJnRoNE%2FUejJe%2FsDBhX4sjkNBzLJwndNRjVEAAFVAeaNwNXU9gU%2BZtYPgScjtto7gOtEMtp5mwB5Bocxk2q9FCfO3c1INgiJO53vT%2F08nLnVDTvAW7Nb4r3wPgxXvZrnFAfczIWFqeyTZtoUi%2FPiXJot7TYgP5aYi0mq8wWc2MTSWaNhQO5jeCkJaNROIWpEvAJAa8203BVUIpUQwwxmGB9BqOMaqsMGYOk%2BGJfqxirsVKW%2F2nsxQD9zE9uAUTP5ZHdf1928lq1JscJzLr0IYLKS3kY1Cv8ZGa6%2FSZQMBU43QHiDV5AQX%2BmSucV4sp34iVSTa%2FAFR9xGSMd7TNqgXU%2BQ2yckj%2BydGkGUV6PYF5YnNIuwg24KMS96VyKmVEb3j4%2Fe2%2F6m7jj4EIr8FCjR53nhVs7PJam%2BMy%2Br90i2xECKeYasvFksNSBTNCEjWLtRm5wsOtdTzPURz5G4SP0vz05PCsQwqbEBVf8nBG3J6vm%2FHm%2Fh9QVhmXnwLUIrpN8ArT3sLrxB4sfy7kVaIpGu%2BgLS27kKhaw9NyHgKfREd7vmykv5niJ7v0NZx8QIqU3YO%2Fx4K34gUpUHp2ffNnzWKt5GzU%2BwXSjNtAI0HOhf6f12XUDr6owVrVDkd4pOwfNt7VQa2aOvIQelmfQz1kvSQ1xVxV39QTQIxBpZcLQ0e89GXUBylxTVjMqQtDSriNT%2FmpSnEO7M%2FB98sfsPcrbddzB%2FbxKMK8n24deXXQtYfUoeDotCoen7laplc6FyTOREfViudAkTx1eEfy9ixNiVesWBgIFBcGE1z7sKcixgDFArESO7UKTXtfVwjtAZIF7aXeHBYxEjtVNbLf%2BeYFF5VlYDIteyBrz159O49z%2Bj%2BtXxrN9t9NNDD8qU76GlyIDiUEn0JuSpT4n4hddX0%2BjnAcG3b3ZfpE1nVLAWB5lstuD88V7N3clOOQ4bb9pFZpitCxKyWVHyxbFJ%2FRwNjtkqATJYxxA%2FiaIg8G335ZtZaj2BaSAfjiHdXln4WHpApS%2FzyvSPTr4Q%2BqAT5y8L3TwLFJtN5T05o826%2BwDqDaU%2FxbOwvR9FElApx6C8b3slMBEA0aVQjLAfN4CfHDPdT4GsyNWhQ4NEnZXTL4AfUCb4OlIHMj75M0KEna%2B1RngSQDIR26iDlxd3qCz5uRyZlexTXGpBIsITEeH5Im0Na9tHHY%3D'
  axios.get(`https://games-staging.pmisg.cloud.sg/pmi-backoffice/public/api/gameplay2021/leaderboard/snake-leaderboard?query=${query}`)
    .then(res => {
      renderLeaderboard('#leaderboard .ldb-list', res.data.leaderboard_list.map(user => {
        if (user.first_name === state._current_user.first_name) {
          return { ...user, first_name: 'You' }
        } else {
          return user
        }
      }))

      if (res.data.my_rank_position > 10) {
        renderLeaderboard('#my-rank', [{
          rank: res.data.my_rank_position,
          first_name: 'You',
          higher_score: state.SCORE
        }])

        $('.separator').fadeIn()
      }
    })
    .catch(err => console.log(err))
}

export function renderLeaderboard (target = '#leaderboard .ldb-list', lists) {
  let html = ''

  lists.forEach(list => {
    html += `<div class="ldb__item">
      <div class="ldb__rank">#${list.rank}</div>
      <div class="ldb__user">${list.first_name}</div>
      <div class="ldb__score">${list.higher_score}</div>
    </div>`
  })

  $(target).append(html)
}

export function showFailScreen () {
  resetGame()
  $('.screen').fadeOut()
  updateAsset(gameTitle, ohnoImgUrl)
  updateAsset(gameBanner, tryagAinImgUrl)
  $('#fail-screen').fadeIn()
}

$('[data-next]').click(nextScreen)

function animate (parent, totalFrames, animationDuration = 1500) {
  const timePerFrame = animationDuration / totalFrames
  let timeWhenLastUpdate
  let timeFromLastUpdate
  let frameNumber = 1

  function step (startTime) {
    if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime
    timeFromLastUpdate = startTime - timeWhenLastUpdate

    if (timeFromLastUpdate > timePerFrame) {
      parent.find('.anim-sequence img').css('opacity', 0)
      parent.find(`.seq-${frameNumber}`).css('opacity', 1)
      timeWhenLastUpdate = startTime

      if (frameNumber >= totalFrames) {
        frameNumber = 1
      } else {
        frameNumber = frameNumber + 1
      }
    }

    sequence = requestAnimationFrame(step)
  }

  sequence = requestAnimationFrame(step)
}

export function updateHud () {
  updateScore()
}

export function updateAsset (element, imageUrl) {
  if ($(element).attr('src') === imageUrl) return

  $(element).fadeOut(function () {
    $(this).attr('src', imageUrl).fadeIn()
  })
}

function updateScore () {
  score.textContent = state.SCORE
}

export function redeemBoost (foodType) {
  if (foodType.color === 'blue') {
    state.SCORE += 20
    score.classList.add('blink')
    updateAsset(gameBanner, xlImgUrl)
    setTimeout(() => score.classList.remove('blink'), 500)
  }

  if (foodType.color === 'green') {
    state.SNAKE_SPEED += 2
    updateAsset(gameBanner, xfImgUrl)
  }

  if (foodType.color === 'red') {
    state.SCORE += 10
    score.classList.add('blink')
    updateAsset(gameBanner, xvImgUrl)
    setTimeout(() => score.classList.remove('blink'), 500)
  }
}

function animateOnvisible (target, dep) {
  if ($(dep).is(':hidden')) return

  $(target).addClass('blink').css({
    animationIterationCount: 1,
    animationDuration: 1
  })
}

export function changeFrame (str) {
  // blue, blue-headless, red-headless
  const [color, type] = str.split('-')

  let headerUrl = frame[`header-${color}`]
  if (type === 'headless') {
    $('#timer, #score').hide()
    headerUrl = frame[`header-${color}-headless`]
  }

  const footerUrl = frame[`footer-${color}`]
  const bodyUrl = frame[`pipe-${color}`]
  $(gameBody).css('background-image', 'url(' + bodyUrl + ')')
  $(gameHeader).find('.header-bg').attr('src', headerUrl)
  $(gameFooter).attr('src', footerUrl)
  $('.big-title').fadeIn()
}

export function resetGame () {
  $(gameBoard).empty()
}
