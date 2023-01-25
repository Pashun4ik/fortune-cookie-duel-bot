function createCoin() {
    document.querySelector('.fcc.button-fast-buy.pba').click()
}

function triggerMouseMoveEvent(node, {x, y}) {
    const mouseMoveEvent = document.createEvent('MouseEvents')

    mouseMoveEvent.initMouseEvent(
           'mousemove',
           true,
           false,
           window,
           1,
           x,
           y,
           x,
           y,
           false,
           false,
           false,
           false,
           0,
           null
    )

    node.dispatchEvent(mouseMoveEvent)
}

function triggerMouseEvent (node, eventType) {
    var clickEvent = document.createEvent('MouseEvents')
    clickEvent.initEvent(eventType, true, true)
    node.dispatchEvent (clickEvent)
}

function getTiles() {
    return Array.from(document.querySelector('.plate-container').querySelectorAll('.cookie-item')).map(node => {
        const type = Number(Array.from(node.classList).find(str => str.includes('cookie-icon-type')).split('type-')[1])
        return {
            node,
            type
        }
    })
}

function getTileToMerge() {
    const tiles = getTiles()

    const tile = tiles.find((el, idx, arr) => {
        return arr.some((el2, idx2) => el.type === el2.type && idx !== idx2)
    })

    return tile
}

function getSecondTileToMerge(tile) {
    const tiles = getTiles()

    return tiles.find(t => t.node !== tile.node && t.type === tile.type)
}


const sleep = ms => new Promise(rs => setTimeout(rs, ms))

async function run() {
    let i = 180

    while(i--) {
        const tile1 = getTileToMerge()

        if(!tile1) {
            createCoin()
            await sleep(200)
            continue
        }

        const tile2 = getSecondTileToMerge(tile1)
        const tile2Rect = tile2.node.getBoundingClientRect()

        const offset = document.querySelector('.plate-container').getBoundingClientRect().x

        triggerMouseEvent(tile1.node, 'mousedown')
        triggerMouseMoveEvent(document.querySelector('.plate-container'), {x: tile2Rect.x+offset, y: tile2Rect.y+offset})
        triggerMouseEvent(document.querySelector('.plate-container'), 'mouseup')

        await sleep(200)
    }
}