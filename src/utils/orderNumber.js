/**
 * Builds a human-readable order number from the order's auto-increment id.
 * Derived from the id (not generated independently) so it's guaranteed unique
 * without extra locking — call after INSERT, using connection.insertId.
 */
export function orderNumberFromId(id) {
  return `LEH-${String(id).padStart(6, '0')}`;
}
