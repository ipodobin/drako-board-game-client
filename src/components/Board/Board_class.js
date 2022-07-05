import React, { Component } from 'react';
import styles from './Board.module.css';
import { GridGenerator, Hex, Hexagon, HexGrid, HexUtils, Layout, Pattern } from 'react-hexgrid';
import { connect } from 'react-redux/es/exports'

class Board_class extends Component {
  
  state = {
    width: 0,
    height: 0,
    hexagons: GridGenerator.hexagon(2)
  }
  
  componentDidMount() {
    this.setState({ width: window.innerWidth });
    this.setState({ height: window.innerHeight });
  }

    onDrop = function(event, source, targetProps) {
      console.log("drop: dropEffect = " + event.dataTransfer.dropEffect + " ; effectAllowed = " + event.dataTransfer.effectAllowed);
      const { hexagons } = this.state;
      let gameState = this.props.gameState;
      if(targetProps.fill = 'dwarf-warrior'){
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
  };
  onDragStart = function(event, source) {
    // If this tile is empty, let's disallow drag
    // if (!source.props.data.text) {
    //   console.log('prevent')
    //   event.preventDefault();
    // }
    console.log("dragStart: dropEffect = " + event.dataTransfer.dropEffect + " ; effectAllowed = " + event.dataTransfer.effectAllowed);
    event.dataTransfer.setData("text", event.target.id);
    event.dataTransfer.effectAllowed = "all";
    event.dataTransfer.dropEffect = "move";
  };

  // Decide here if you want to allow drop to this node
  onDragOver(event, source) {
    console.log("dragOver: dropEffect = " + event.dataTransfer.dropEffect + " ; effectAllowed = " + event.dataTransfer.effectAllowed);
    // Find blocked hexagons by their 'blocked' attribute
    const blockedHexas = this.state.hexagons.filter(h => h.blocked);
    // Find if this hexagon is listed in blocked ones
    const blocked = blockedHexas.find(blockedHex => {
      return HexUtils.equals(source.state.hex, blockedHex);
    });

    // Allow drop, if not blocked and there's no content already
    if (!blocked) {
      // Call preventDefault if you want to allow drop
      event.preventDefault();
      event.dataTransfer.effectAllowed = "none";
    } else {      
      event.dataTransfer.effectAllowed = "move";
    }
  }

  // onDragEnd you can do some logic, e.g. to clean up hexagon if drop was success
  onDragEnd(event, source, success) {    
    console.log("dragEnd: dropEffect = " + event.dataTransfer.dropEffect + " ; effectAllowed = " + event.dataTransfer.effectAllowed);
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
  render() {
    let gameState = this.props.gameState;
    let { hexagons, width, height } = this.state;
    return (
    <div className={styles.Board}>
    <HexGrid width={width} height={height}>
                    <Layout size={{x: 10, y: 10}} flat={true} origin={{x: 0, y: 0}}>
                        {hexagons.map((hex, i) =>
                            <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s}>
                                {/* <Text>{hex.q}, {hex.r}, {hex.s}</Text> */}
                            </Hexagon>
                        )}
                        {gameState.dwarfs.warrior.alive ? 
                        <Hexagon key="dwarf_warrior" 
                          fill="dwarf-warrior"
                          q={gameState.dwarfs.warrior.position.x}
                          r={gameState.dwarfs.warrior.position.y} 
                          s={gameState.dwarfs.warrior.position.z}
                          onDragStart={(e, h) => this.onDragStart(e, h)}
              onDragEnd={(e, h, s) => this.onDragEnd(e, h, s)}
              onDrop={(e, h, t) => this.onDrop(e, h, t) }
              onDragOver={(e, h) => this.onDragOver(e, h) }>
                            {/* <Text>Warrior</Text> */}
                        </Hexagon> 
                        : ''}
                        {gameState.dwarfs.netter.alive ? 
                        <Hexagon key="dwarf_netter" 
                          fill="dwarf-netter"
                          q={gameState.dwarfs.netter.position.x}
                          r={gameState.dwarfs.netter.position.y} 
                          s={gameState.dwarfs.netter.position.z}
                          onDragStart={(e, h) => this.onDragStart(e, h)}
              onDragEnd={(e, h, s) => this.onDragEnd(e, h, s)}
              onDrop={(e, h, t) => this.onDrop(e, h, t) }
              onDragOver={(e, h) => this.onDragOver(e, h) }>
                            {/* <Text>Netter</Text> */}
                        </Hexagon>
                        : ''}
                        {gameState.dwarfs.crossbowman.alive ? 
                        <Hexagon key="dwarf_crossbowman" 
                          fill="dwarf-archer"
                          q={gameState.dwarfs.crossbowman.position.x}
                          r={gameState.dwarfs.crossbowman.position.y} 
                          s={gameState.dwarfs.crossbowman.position.z}
                          onDragStart={(e, h) => this.onDragStart(e, h)}
              onDragEnd={(e, h, s) => this.onDragEnd(e, h, s)}
              onDrop={(e, h, t) => this.onDrop(e, h, t) }
              onDragOver={(e, h) => this.onDragOver(e, h) }>
                            {/* <Text>Crossbowman</Text> */}
                        </Hexagon>
                        : ''}
                        {gameState.drako.dragon.alive ? 
                        <Hexagon key="dragon" 
                          fill="dragon"
                          q={gameState.drako.dragon.position.x}
                          r={gameState.drako.dragon.position.y} 
                          s={gameState.drako.dragon.position.z}
                          onDragStart={(e, h) => this.onDragStart(e, h)}
              onDragEnd={(e, h, s) => this.onDragEnd(e, h, s)}
              onDrop={(e, h, t) => this.onDrop(e, h, t) }
              onDragOver={(e, h) => this.onDragOver(e, h) }>
                            {/*<Text>Dragon</Text> */}
                        </Hexagon>
                        : ''}
                    </Layout>
                    
          <Pattern id="dwarf-warrior" link="/character/warrior.jpg" />
          <Pattern id="dwarf-archer" link="/character/archer.jpg" />
          <Pattern id="dwarf-netter" link="/character/netter.webp" />
          <Pattern id="dragon" link="/character/dragon.jpg" />
                </HexGrid>
                </div>
);
};
};

function mapStateToProps(state) {
  const gameState = state.gameState;
  return {
    gameState
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    move: (q, r, s, character) => dispatch({
      type: 'move',
      position: {q: q, r: r, s: s},
      character: character
    })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Board_class);
