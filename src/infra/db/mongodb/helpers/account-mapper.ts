export const changeMongoDashedIdToId = <T>(object: any): T => {
  object['id'] = object['_id'];
  delete object['_id'];
  return object;
};
