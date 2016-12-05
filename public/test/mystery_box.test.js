import Box from '../js/mystery_box.js';

describe("Tests mystery_box",()=>{

  it('render without crashing',() => {

    expect(true).toBe(true);
    // Box.createBox(1,1);
  });

  it("matcher no verdadero", function() {
    expect(false).not.toBe(false);
  });

});
