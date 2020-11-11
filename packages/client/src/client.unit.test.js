const {TurboKeeperClient} = require("./client");

jest.mock("ethers");

describe("getRelayers", () => {
  test("returns an empty list if no candidates in contract", async () => {
    require("ethers").__setRelayers([], {});

    const client = new TurboKeeperClient();
    const relayers = await client.getRelayers();

    expect(relayers).toStrictEqual([]);
  });

  test("returns the best relayer by burn", async () => {
    require("ethers").__setRelayers(
      [1, 2, 3],
      ["ip", "ip", "ip"],
      [100, 300, 90]
    );

    const client = new TurboKeeperClient();

    let relayers = await client.getRelayers();
    expect(relayers).toStrictEqual([
      {
        address: 2,
        locator: "2",
        locatorType: "ip",
        burn: 300,
      },
    ]);
  });

  test("ignores the specified addresses in figuring out which to return", async () => {
    require("ethers").__setRelayers(
      [1, 2, 3],
      ["ip", "ip", "ip"],
      [100, 300, 90]
    );

    const client = new TurboKeeperClient();

    let relayers = await client.getRelayers(1, new Set([2]));
    expect(relayers).toStrictEqual([
      {
        address: 1,
        locator: "1",
        locatorType: "ip",
        burn: 100,
      },
    ]);
  });

  test("ignore locators that aren't allowed", async () => {
    require("ethers").__setRelayers(
      [1, 2, 3],
      ["ip", "ip", "tor"],
      [100, 300, 90]
    );

    const client = new TurboKeeperClient();

    let relayers = await client.getRelayers(1, new Set([]), new Set(["tor"]));
    expect(relayers).toStrictEqual([
      {
        address: 3,
        locator: "3",
        locatorType: "tor",
        burn: 90,
      },
    ]);
  });

  test("returns an empty list if no relayers with the specified locator type", async () => {
    require("ethers").__setRelayers(
      [1, 2, 3],
      ["ip", "ip", "ip"],
      [100, 300, 90]
    );

    const client = new TurboKeeperClient();

    let relayers = await client.getRelayers(1, new Set([]), new Set(["tor"]));
    expect(relayers).toStrictEqual([]);
  });

  test("returns multiple relayers if more than 1 is asked for", async () => {
    require("ethers").__setRelayers(
      [1, 2, 3],
      ["tor", "ip", "ip"],
      [100, 300, 90]
    );

    const client = new TurboKeeperClient();

    let relayers = await client.getRelayers(2);
    expect(relayers).toStrictEqual([
      {
        address: 2,
        locator: "2",
        locatorType: "ip",
        burn: 300,
      },
      {
        address: 1,
        locator: "1",
        locatorType: "tor",
        burn: 100,
      },
    ]);
  });
});
