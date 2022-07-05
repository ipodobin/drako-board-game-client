import React, {useEffect} from 'react';
import styles from './Board.module.css';
import {GridGenerator, Hexagon, HexGrid, HexUtils, Layout, Pattern, Text} from 'react-hexgrid';
import {useSelector} from 'react-redux'
import _Hex2 from "react-hexgrid/lib/Path";

const Board = () => {
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const hexagons = GridGenerator.hexagon(2);
    const gameState = useSelector((state) => state.gameState)
    const characters = useSelector((state) => prepareCharacters(state.gameState))
    // const [characters, setCharacters] = React.useState(prepareCharacters(gameState));

    function prepareCharacters(gameState) {
        const characters = new Array();
        characters.push(
            {
                character: gameState.dwarfs.warrior,
                selected: false,
                fill: 'dwarf-warrior'
            },
            {
                character: gameState.dwarfs.crossbowman,
                selected: false,
                fill: 'dwarf-archer'
            },
            {
                character: gameState.dwarfs.netter,
                selected: false,
                fill: 'dwarf-netter'
            },
            {
                character: gameState.drako.dragon,
                selected: false,
                fill: 'dragon'
            }
        )
        return characters;
    }

    function updateDimensions() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        console.log('state:', gameState)

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        setTimeout(() => updateDimensions(), 100);

        // window.removeEventListener('resize', this.updateDimensions);
    }, []);

    function onDrop(event, source, targetProps) {
        const hexBelow = hexagons.find(hex => {
            return HexUtils.equals(source.state.hex, hex);
        });
        console.log('hexBelow', hexBelow);
        // console.log("drop: dropEffect = " + event.dataTransfer.dropEffect + " ; effectAllowed = " + event.dataTransfer.effectAllowed);
        if (targetProps.fill = 'dwarf-warrior') {
            // this.props.move(source.state.hex.q, source.state.hex.r, source.state.hex.s, 'dwarf-warrior');
            // gameState.dwarfs.warrior.position={x:source.state.hex.q,y:source.state.hex.r,z:source.state.hex.s}
        }
        // const hexas = hexagons.map(hex => {
        //   // When hexagon is dropped on this hexagon, copy it's image and text
        //   if (HexUtils.equals(source.state.hex, hex)) {
        //     // hex.image = targetProps.data.image;
        //     // hex.text = targetProps.data.text;
        //     targetProps.hex = hex
        //   }
        //   return hex;
        // });
        // this.setState({ hexagons: hexas });
    }

    function onDragStart(event, source) {
        // console.log("dragStart: dropEffect = " + event.dataTransfer.dropEffect + " ; effectAllowed = " + event.dataTransfer.effectAllowed);
        event.dataTransfer.setData("text", event.target.id);
        event.dataTransfer.effectAllowed = "all";
        event.dataTransfer.dropEffect = "move";
        // if (!source.props.data.text) {
        //     event.preventDefault();
        // }
    }

    function onDragOver(event, source) {
        console.log("dragOver: dropEffect = " + event.dataTransfer.dropEffect + " ; effectAllowed = " + event.dataTransfer.effectAllowed);
        // Find blocked hexagons by their 'blocked' attribute
        const blockedHexes = hexagons.filter(h => h.blocked);
        // console.log('hexagons', hexagons);
        // Find if this hexagon is listed in blocked ones
        const blocked = blockedHexes.find(blockedHex => {
            return HexUtils.equals(source.state.hex, blockedHex);
        });
        const hexBelow = hexagons.find(hex => {
            return HexUtils.equals(source.state.hex, hex);
        });
        // console.log('hexBelow', hexBelow);

        // Allow drop, if not blocked and there's no content already
        // if (!blocked) {
        // Call preventDefault if you want to allow drop
        event.preventDefault();
        event.dataTransfer.effectAllowed = "move";
        // } else {
        //     event.dataTransfer.effectAllowed = "none";
        // }
    }

    function onDragEnd(event, source, success) {
        // console.log("dragEnd: dropEffect = " + event.dataTransfer.dropEffect + " ; effectAllowed = " + event.dataTransfer.effectAllowed);
        // if (!success) {
        //   return;
        // }
        // // TODO Drop the whole hex from array, currently somethings wrong with the patterns

        // const { hexagons } = this.state;
        // // When hexagon is successfully dropped, empty it's text and image
        // const hexas = hexagons.map(hex => {
        //   if (HexUtils.equals(source.state.hex, hex)) {
        //     hex.text = null;
        //     hex.image = null;
        //   }
        //   return hex;
        // });
        // this.setState({ hexagons: hexas });
    }

    function selectCharacter(event, source) {
        console.log("event", event);
        console.log("source", source);
        // event.target.
        let newCharacters = characters.map(function (ch) {
            if (ch.fill === source.props.fill) {
                ch.selected = true;
            } else {
                ch.selected = false;
            }
            return ch;
        });
        // setCharacters(newCharacters);
    }

    return (
        <div className={styles.Board}>
            <HexGrid width={width} height={height}>
                <Layout size={{x: 10, y: 10}} flat={true} origin={{x: 0, y: 0}}>
                    {hexagons.map((hex, i) =>
                        <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s}>
                            {/* <Text>{hex.q}, {hex.r}, {hex.s}</Text> */}
                        </Hexagon>
                    )}
                    {characters.map((ch, i) =>
                        ch.character.alive ?
                            <Hexagon
                                key={ch.fill}
                                fill={ch.fill}
                                q={ch.character.position.x}
                                r={ch.character.position.y}
                                s={ch.character.position.z}
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                onClick={selectCharacter}
                            />
                            : ''
                    )}
                </Layout>

                <Pattern id="dwarf-warrior" link="/character/warrior.jpg"/>
                <Pattern id="dwarf-archer" link="/character/archer.jpg"/>
                <Pattern id="dwarf-netter" link="/character/netter.webp"/>
                <Pattern id="dragon" link="/character/dragon.jpg"/>
            </HexGrid>
        </div>
    );
};

Board.propTypes = {};

Board.defaultProps = {};

export default Board;
