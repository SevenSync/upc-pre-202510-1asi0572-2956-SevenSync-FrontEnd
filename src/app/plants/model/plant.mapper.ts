import {PlantDto} from './plant.dto';
import {Plant} from './plant.entity';


export class PlantMapper {
  static fromDto(dto: PlantDto): Plant {
    return new Plant(
      dto.id,
      dto.common_name,
      dto.scientific_name,
      dto.watering,
      dto.sunlight,
      dto.soil,
      dto.temperature,
      dto.humidity,
      dto.ph,
      dto.default_image?.original_url || 'https://via.placeholder.com/150'
    );
  }
}
