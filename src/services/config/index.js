

export const getColorCodeByClientCode = (clientConfig, clientCode) => {
    return clientConfig && 
           clientConfig.filter(obj => obj["CODE"] === clientCode) &&
           clientConfig.filter(obj => obj["CODE"] === clientCode)[0] &&
           clientConfig.filter(obj => obj["CODE"] === clientCode)[0]["Value"]
}