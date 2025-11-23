from flask import Blueprint, jsonify, request

from app.repositories.max_wave_height_repository import MaxWaveHeightRepository

waves_bp = Blueprint("waves", __name__, url_prefix="/waves")

@waves_bp.get("")
def max_wave_at():
    lat = float(request.args.get("lat"))
    lon = float(request.args.get("lon"))

    with MaxWaveHeightRepository() as repository:
        result = repository.get_max_for_location(lat, lon)
    return jsonify(result)
